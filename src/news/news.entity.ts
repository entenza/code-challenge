import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { ICommonNews } from '../common/interfaces/common-news.interface';

@Entity()
export class News implements ICommonNews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    default: new Date()
  })
  created_at: Date;

  @Column({
    default: '',
    nullable: true,
  })
  title: string;

  @Column({
    default: '',
    nullable: true,
  })
  url: string;

  @Column({
    default: '',
    nullable: true,
  })
  author: string;

  @Column({
    default: '',
    nullable: true,
  })
  points: string;

  @Column({
    default: '',
    nullable: true,
  })
  story_text: string;

  @Column({
    default: '',
    nullable: true,
  })
  comment_text: string;

  @Column({
    default: 0,
    nullable: true,
  })
  num_comments: number;

  @Column({
    default: 0,
    nullable: true,
  })
  story_id: number;

  @Column({
    default: '',
    nullable: true,
  })
  story_title: string;

  @Column({
    default: '',
    nullable: true,
  })
  story_url: string;

  @Column({
    default: 0,
    nullable: true,
  })
  parent_id: number;

  @Column({
    default: 0,
    nullable: true,
  })
  created_at_i: number;

  @Column({
    default: '',
    nullable: true,
  })
  tags: string;

  @Column()
  objectID: string;

  @Column({ nullable: true})
  deleted: Date;
}