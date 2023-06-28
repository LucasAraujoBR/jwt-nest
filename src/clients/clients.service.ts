import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './client.model';
import { PaginationDto } from './pagination.dto';
import { resolve as resolveUrl } from 'url';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    baseUrl: string = 'http://localhost:3000/clients',
  ): Promise<PaginationDto<Client[]>> {
    const skip = (page - 1) * limit;

    const [data, totalItems] = await Promise.all([
      this.clientModel.find().skip(skip).limit(limit).exec(),
      this.clientModel.countDocuments().exec(),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    const nextPage = page < totalPages ? +page + 1 : null;
    const prevPage = page > 1 ? +page - 1 : null;

    const nextPageUrl = nextPage
      ? resolveUrl(baseUrl, `?page=${nextPage}&limit=${limit}`)
      : null;
    const prevPageUrl = prevPage
      ? resolveUrl(baseUrl, `?page=${prevPage}&limit=${limit}`)
      : null;

    return {
      totalPages,
      totalItems,
      nextPageUrl,
      prevPageUrl,
      data,
    };
  }

  async findOne(id: string): Promise<Client> {
    return this.clientModel.findById(id).exec();
  }

  async create(client: Client): Promise<Client> {
    const newClient = new this.clientModel(client);
    return newClient.save();
  }

  async update(id: string, client: Client): Promise<Client> {
    return this.clientModel.findByIdAndUpdate(id, client, { new: true }).exec();
  }

  async delete(id: string): Promise<Client> {
    return this.clientModel.findByIdAndRemove(id).exec();
  }
}
function urljoin(baseUrl: string, arg1: string) {
  throw new Error('Function not implemented.');
}
