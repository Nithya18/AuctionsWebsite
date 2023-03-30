/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { connectDb } from '../../connection/dataSource';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const users = connectDb.getRepository(User);

@Injectable()
export class UserRepository {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async create(data: CreateUserDto) {
    return await users.save(data);
  }

  async read() {
    return await users.find();
  }

  async update(id: number, data: UpdateUserDto) {
    return await users.update({ id }, data);
  }

  async deleteOne(id: number) {
    const deleteResponse = await users.softDelete(id);
    if (!deleteResponse.affected) {
      return new HttpException('DELETED', HttpStatus.GONE);
    }
  }
  async getOne(email: string) {
    return await users.findOne({ where: { email } });
  }
}
