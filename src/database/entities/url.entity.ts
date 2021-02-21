import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'urls' })
export class Urls {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  newUrl: string;

  @Column()
  expired: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
