import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { UserEntity } from '../Entity/user.entity';

export class JwtCostumStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'Loasdaosidhjk3242',
    });
  }

  async validate(payload: { username: string }) {
    const { username } = payload;
    const user = await this.repo.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
