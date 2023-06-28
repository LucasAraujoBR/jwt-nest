import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsController } from './clients/clients.controller';
import { ClientsService } from './clients/clients.service';
import { Client, ClientSchema } from './clients/client.model';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-crud'),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    AuthModule,
  ],
  controllers: [ClientsController,AuthController],
  providers: [ClientsService],
})
export class AppModule {}
