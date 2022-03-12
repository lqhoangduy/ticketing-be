import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/modules/auth/decorator/role.decorator';
import { UserCredentialsDto } from '../dto/user-credential.dto';
import { UserService } from '../services/user.service';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { UserUpdateDto } from '../dto/user-update.dto';
import { User } from './../../../decorator/user.decorator';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getProfile(@User('id') id: string) {
    try {
      return this.userService.getUserByJWt(id);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async getProfileByAdmin(@Param('id') id: string) {
    const res = await this.userService.getUserById(id);
    return res;
  }

  @Get('')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async getAllProfile() {
    return await this.userService.getAllUser();
  }

  @Post('signup')
  async signup(@Body() userCredential: UserCredentialsDto) {
    return this.userService.signup(userCredential);
  }

  @Patch('/:id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async updateUserByAdmin(
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    try {
      return this.userService.update(userUpdateDto, id);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateUser(
    @Body() userUpdateDto: UserUpdateDto,
    @User('id') userId: string,
  ) {
    try {
      return this.userService.update(userUpdateDto, userId);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
