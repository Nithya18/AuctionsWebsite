/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { encodePassword } from '../../utility/password';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository){}

  async create(createUserDto: CreateUserDto) {
    try{
      const encryptedPassword = encodePassword(createUserDto.password)
      await this.userRepository.create({...createUserDto , password: encryptedPassword}); 
      return new HttpException('user created' , HttpStatus.CREATED);
    }catch(e){
      throw e;
    }  
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string) {
    try{
      const user = await this.userRepository.getOne(email);
      return user;
    }catch(e){
      throw e;
    }
    
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
