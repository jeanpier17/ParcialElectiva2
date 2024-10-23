import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';


@Entity('users') 
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' }) 
  firstName: string;

  @Column({ name: 'last_name' }) 
  lastName: string;

  @Column({ unique: true }) 
  email: string; 

  @Column()
  password: string;


}
