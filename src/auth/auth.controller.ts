// auth.controller.ts

import { Controller, Post, Request, Get, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req): Promise<any> {
    const userId = 'coloqueAquiOIdDoUsuario'; // Aqui você deve fazer a autenticação do usuário

    const accessToken = await this.authService.generateAccessToken(userId);
    const refreshToken = await this.authService.generateRefreshToken(userId);

    return { accessToken, refreshToken };
  }

  @Post('refresh')
  async refresh(@Request() req): Promise<any> {
    const refreshToken = req.body.refreshToken;
    const validToken = await this.authService.validateToken(refreshToken);

    if (!validToken) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    const decodedToken = await this.authService.decodeToken(refreshToken);
    const userId = decodedToken.sub;

    const accessToken = await this.authService.generateAccessToken(userId);
    const newRefreshToken = await this.authService.generateRefreshToken(userId);

    return { accessToken, refreshToken: newRefreshToken };
  }

  @Get('logout')
  async logout(): Promise<any> {
    // Aqui você pode implementar a lógica de invalidar o token ou o refresh token
    // Pode ser feito através de blacklist ou outra estratégia de sua escolha
    return { message: 'Logout realizado com sucesso' };
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  async protectedRoute(@Request() req): Promise<any> {
    return { message: 'Rota protegida!' };
  }
}
