/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { baseEntity } from '../../../utility/base-entity';

@Entity()
export class Auction extends baseEntity{
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  timeperiod: string;

  @Column()
  bidAmount: string;

  




  
}
