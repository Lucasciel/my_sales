import { Entity, Column, PrimaryGeneratedColumn, Generated, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity('user_tokens')
export default class UserToken {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
