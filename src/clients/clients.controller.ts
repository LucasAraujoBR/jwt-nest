import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './client.model';
import { PaginationDto } from './pagination.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number
  ): Promise<PaginationDto<Client[]>> {
    return this.clientsService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    return this.clientsService.findOne(id);
  }

  @Post()
  async create(@Body() client: Client): Promise<Client> {
    return this.clientsService.create(client);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() client: Client): Promise<Client> {
    return this.clientsService.update(id, client);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Client> {
    return this.clientsService.delete(id);
  }
}
