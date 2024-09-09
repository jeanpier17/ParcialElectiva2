import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  email:string;

  @Column()
  name:String;
}