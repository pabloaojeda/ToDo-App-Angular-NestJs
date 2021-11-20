import {
  Injectable,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, useContainer } from 'typeorm';
import { UserEntity } from '../Entity/user.entity';
import { RegisterUserDto } from '../DTO/registerUser.DTO';
import * as bcrypt from 'bcryptjs';
import { UserLoginDto } from '../DTO/userLogin.DTO';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    private jwt: JwtService,
  ) {}

  async registerUser(registerDTO: RegisterUserDto) {
    const { username, password } = registerDTO;

    const hashed = await bcrypt.hash(password, 12);
    const salt = await bcrypt.getSalt(hashed);

    const user = new UserEntity();
    user.username = username;
    user.password = hashed;
    user.salt = salt;

    this.repo.create(user);
    try {
      return await this.repo.save(user);
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong, user was not created',
      );
    }
  }
  async loginUser(userLoginDto: UserLoginDto) {
    const { username, password } = userLoginDto;
    const user = this.repo.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid credetials.');
    }
    const salt = (await user).salt;
    const isPasswordMatch = await bcrypt.compare(
      password,
      (
        await user
      ).password,
    );

    if (isPasswordMatch) {
      const jwtPayLoad = { username };
      const jwtToken = await this.jwt.signAsync(jwtPayLoad, {
        expiresIn: '1d',
        algorithm: 'HS512',
      });
      return { token: jwtToken };
    } else {
      throw new UnauthorizedException('Invalid credetials.');
    }
  }
}
