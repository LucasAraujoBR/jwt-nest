// auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
