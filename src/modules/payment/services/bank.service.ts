import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from './../../user/services/user.service';
import { BankEntity } from '../domain/entities/bank.entity';
import { BankDto } from '../dto/bank.dto';
import { BankRepository } from '../infrastructure/bank.repository';
import { BankUpdateDto } from '../dto/bank-update.dto';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(BankRepository)
    private bankRepository: BankRepository,
    private readonly userService: UserService,
  ) {}

  async create(bankDto: BankDto): Promise<boolean> {
    const { userId } = bankDto;
    const user = await this.userService.getUserById(userId);
    if (user) {
      const newBank = await this.bankRepository.create(bankDto);
      const result = await this.bankRepository.save(newBank);
      return !!result;
    }
    return false;
  }

  async update(userId: string, bankUpdateDto: BankUpdateDto): Promise<boolean> {
    const bank = await this.find(userId);
    if (bank) {
      await this.bankRepository.update(
        {
          userId: userId,
        },
        {
          ...bankUpdateDto,
        },
      );
      return true;
    } else {
      return false;
    }
  }

  async find(userId: string): Promise<BankEntity> {
    const entity = await this.bankRepository.findOne({ userId: userId });
    return entity;
  }

  async delete(userId: string): Promise<boolean> {
    try {
      await this.bankRepository.delete({ userId: userId });
      return true;
    } catch (error) {
      return false;
    }
  }
}
