// auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateAccessToken(userId: string): Promise<string> {
    const payload = { sub: userId };
    return this.jwtService.sign(payload, {
      expiresIn: jwtConstants.expiresIn,
    });
  }

  async generateRefreshToken(userId: string): Promise<string> {
    const payload = { sub: userId };
    return this.jwtService.sign(payload, {
      expiresIn: jwtConstants.refreshExpiresIn,
    });
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return this.jwtService.verifyAsync(token);
    } catch (error) {
      return null;
    }
  }
}
