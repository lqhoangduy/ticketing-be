import { UserEntity } from './../../user/domain/entities/user.entity';
import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../../user/services/user.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './../../user/dto/user-login.dto';
import { FacebookAuthService } from 'facebook-auth-nestjs';
import { RoleService } from 'src/modules/role-permission/services/role.service';
import { IJwtPayload } from '../domain/interfaces/jwt-payload.interface';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly facebookService: FacebookAuthService,
    private readonly roleService: RoleService,
  ) {}

  async login(userLogin: UserLoginDto): Promise<LoginDto> {
    const { email, password } = userLogin;
    const user = await this.userService.getUserByEmail(email);
    if (user && !user.isSocial) {
      if (user && (await bcrypt.compare(password, user.password))) {
        const role = await this.roleService.getRoleById(user.roleId);
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: role.name,
          avatar: user.avatar,
        };
        const accessToken = await this.generateToken(user);
        return { accessToken, payload };
      } else {
        throw new UnauthorizedException('Please check your email or password');
      }
    } else {
      throw new BadRequestException('Login Fail');
    }
  }

  async loginWithFacebook(accessToken: string): Promise<LoginDto> {
    try {
      const user = await this.facebookService.getUser(
        accessToken,
        'id',
        'name',
        'email',
      );

      if (user) {
        const internalUser = await this.userService.signup(user);
        const { email, name, roleId, id } = internalUser;
        const role = await this.roleService.getRoleById(roleId);
        const payload = {
          id,
          email,
          name,
          role: role.name,
        };
        const accessToken = await this.generateToken(internalUser);
        return { accessToken, payload };
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async generateToken(user: UserEntity): Promise<string> {
    const payload: IJwtPayload = {
      email: user.email,
      id: user.id,
      role: user.role.name,
    };
    const accessToken: string = await this.jwtService.sign(payload);
    return accessToken;
  }
}
