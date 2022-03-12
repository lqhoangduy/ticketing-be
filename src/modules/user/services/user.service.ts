import { UserEntity } from './../domain/entities/user.entity';
import { UserRepository } from './../infrastructure/user.repository';
import { RoleService } from '../../role-permission/services/role.service';
import {
  ConflictException,
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserCredentialsDto } from '../dto/user-credential.dto';
import { UserDto } from '../dto/user.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { TatumService } from './../../share/services/tatum.service';
import { WalletService } from './../../payment/services/wallet.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private roleService: RoleService,
    private tatumService: TatumService,
    @Inject(forwardRef(() => WalletService))
    private walletService: WalletService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async getUserByJWt(id: string): Promise<UserDto> {
    const result = await this.userRepository.findOne(id);
    // const current = await this.tatumService.getCurrentBlock();
    // console.log(current);
    if (result) {
      const role = await this.roleService.getRoleById(result.roleId);
      const user = {
        id: result.id,
        email: result.email,
        name: result.name,
        role: role.name,
        gender: result.gender,
        birthday: result.birthday,
        numberPhone: result.numberPhone,
        avatar: result.avatar,
      };
      return user;
    } else {
      throw new NotFoundException('Not found');
    }
  }

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('Not found');
    return this.mapper.map(user, UserDto, UserEntity);
  }

  async getAllUser(): Promise<UserDto[]> {
    try {
      const entities = await this.userRepository.find();
      const users = entities.map((entity) => {
        return this.mapper.map(entity, UserDto, UserEntity);
      });
      return users;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async signup(userCredential: UserCredentialsDto): Promise<any> {
    const { id: uidFacebook, email, name, gender, password } = userCredential;
    const isInvalidUser = await this.getUserByEmail(email);
    if (isInvalidUser && isInvalidUser.isSocial) return isInvalidUser;

    if (isInvalidUser && !isInvalidUser.isSocial)
      throw new ConflictException('Email already exists');

    const role = await this.roleService.findRole('user');

    const newUser = this.userRepository.create({
      email: email,
      username: password ? email : uidFacebook,
      name: name,
      isSocial: password ? false : true,
      roleId: role.id,
      gender: gender,
    });

    if (password) {
      newUser.password = bcrypt.hashSync(password, 10);
    } else {
      newUser.password = null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await this.userRepository.save(newUser);

    if (result) {
      const wallet = await this.tatumService.generateFlowWallet();
      await this.walletService.create({
        userId: result.id,
        walletAddress: wallet.xpub,
        mnemonic: wallet.mnemonic,
      });

      const dto: UserDto = {
        email: result.email,
        name: result.name,
        role: role.name,
        isSocial: result.isSocial,
      };
      return dto;
    }
  }

  async update(userUpdateDto: UserUpdateDto, userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne(userId);
    if (user) {
      const userUpdated = await this.userRepository.update(
        {
          id: userId,
        },
        {
          ...userUpdateDto,
        },
      );
      return !!userUpdated.affected;
    } else {
      return false;
    }
  }
}
