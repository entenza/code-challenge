import { Expose, Transform } from 'class-transformer';

import { ICommonNews } from '../interfaces/common-news.interface';

export class CommonNewsDto implements ICommonNews {
  @Expose()
  created_at: Date;

  @Expose()
  title: string;

  @Expose()
  url: string;

  @Expose()
  author: string;

  @Expose()
  points: string;

  @Expose()
  story_text: string;

  @Expose()
  comment_text: string;

  @Expose()
  num_comments: number;

  @Expose()
  story_id: number;

  @Expose()
  story_title: string;

  @Expose()
  story_url: string;

  @Expose()
  parent_id: number;

  @Expose()
  created_at_i: number;

  @Expose({
    name: '_tags',
  })
  @Transform(({ value }) => {
    if (!value) {
      return '';
    }
    if (Array.isArray(value)) {
      return value.join();
    }
    return '-';
  })
  tags: string;

  @Expose()
  objectID: string;

  
}
