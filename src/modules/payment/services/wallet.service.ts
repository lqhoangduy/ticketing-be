import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletEntity } from '../domain/entities/wallet.entity';
import { WalletUpdateDto } from '../dto/wallet-update.dto';
import { WalletDto } from '../dto/wallet.dto';
import { WalletRepository } from '../infrastructure/wallet.repository';
import { UserService } from './../../user/services/user.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletRepository)
    private walletRespository: WalletRepository,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async create(walletDto: WalletDto): Promise<boolean> {
    const { userId } = walletDto;
    const user = await this.userService.getUserById(userId);
    if (user) {
      const newWallet = await this.walletRespository.create(walletDto);
      await this.walletRespository.save(newWallet);
      return true;
    } else {
      return false;
    }
  }

  async update(
    userId: string,
    walletUpdateDto: WalletUpdateDto,
  ): Promise<boolean> {
    const wallet = await this.find(userId);
    if (wallet) {
      await this.walletRespository.update(
        {
          userId: userId,
        },
        {
          ...walletUpdateDto,
        },
      );
      return true;
    } else {
      return false;
    }
  }

  async find(userId: string): Promise<WalletEntity> {
    const entity = await this.walletRespository.findOne({ userId: userId });
    return entity;
  }

  async delete(userId: string): Promise<boolean> {
    try {
      await this.walletRespository.delete({ userId: userId });
      return true;
    } catch (error) {
      return false;
    }
  }
}
