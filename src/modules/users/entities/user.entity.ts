/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { baseEntity } from '../../../utility/base-entity';
@Entity()
export class  User extends baseEntity{

  @Column({ length: 500 })
  name: string;

  @Column('text')
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column('int' , {default: 0 })
  accountBalance: number;


}