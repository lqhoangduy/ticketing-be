import { StatusEnum } from './../domain/enums/status.enum';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { OrderRepository } from './order.repository';
import { EventService } from './../../event/services/event.service';
import { TatumService } from './../../share/services/tatum.service';

@Processor('order-queue')
export class OrderConsumer {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    private readonly eventService: EventService,
    private readonly tatumService: TatumService,
  ) {}
  @Process('order-job')
  async orderJob(
    job: Job<{
      id: string;
      amount: number;
      eventId: string;
      userId: string;
      walletAddress: string;
      mnemonic: string;
    }>,
  ) {
    const { id, amount, eventId, userId, walletAddress, mnemonic } = job.data;

    // Generate Address
    const address = await this.tatumService.generateAddress(walletAddress, 2);

    // Get privateKey
    const privateKey = await this.tatumService.generatePrivateKey(mnemonic, 2);

    // Deplot NFT Smartcontact
    const txId = await this.tatumService.deployFlowNft(privateKey, address);

    // Get smartcontractAddress
    const contractAddress = await this.tatumService.getContractAddress(txId);

    // Upload metaData
    const url = await this.tatumService.uploadMetaData(
      {
        eventId,
        userId,
      },
      address,
    );

    // Mint Nft
    const tokenNFT = await this.tatumService.mintNft(
      address,
      url,
      contractAddress,
      privateKey,
    );

    if (tokenNFT.txId) {
      const order = await this.orderRepository.findOne({ id });
      const ticketArr: string[] = order.tickets || [];
      ticketArr.push(tokenNFT.txId);

      await this.orderRepository.update(
        {
          id: id,
        },
        {
          tickets: ticketArr,
          status:
            ticketArr.length === amount ? StatusEnum.Done : StatusEnum.Progress,
        },
      );

      ticketArr.length === amount &&
        (await this.eventService.updateAvaiableTickets(eventId, amount));
    }
  }

  // @OnQueueActive()
  // onActive(job: Job) {
  // ng job ${job.id} of type ${job.name} with data ${job.data}...`,
  //   );
  // }

  // @OnQueueCompleted()
  // onComplete(job: Job, result: any) {
  // d job ${job.id} of type ${job.name}. Result: ${JSON.stringify(
  //       result,
  //     )}`,
  //   );
  // }

  // @OnQueueFailed()
  // onError(job: Job, error: any) {
  // ob ${job.id} of type ${job.name}: ${error.message}`,
  //     error.stack,
  //   );
  // }
}
