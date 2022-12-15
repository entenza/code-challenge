import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { ICommonNews } from '../common/interfaces/common-news.interface';

@Entity()
export class News implements ICommonNews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: Date;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  author: string;

  @Column()
  points: string;

  @Column()
  story_text: string;

  @Column()
  comment_text: string;

  @Column()
  num_comments: number;

  @Column()
  story_id: number;

  @Column()
  story_title: string;

  @Column()
  story_url: string;

  @Column()
  parent_id: number;

  @Column()
  created_at_i: number;

  @Column()
  tags: string;

  @Column()
  objectID: string;
}