import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import {
  ERROR_FETCHING_FROM_API,
  ERROR_INSERTING_NEWS,
  ERROR_NEW_NOT_EXIST,
} from 'src/common/errors';
import { GetNewsRequest } from 'src/common/request/getNews.request';

import { NewsService } from './news.service';
import { validMonths } from '../common/validMonths';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('News Endpoints')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getNews(@Query() query: GetNewsRequest, @Res() response) {
    const { month } = query;
    // console.log("month ", month);

    if (month) {
      if (!validMonths.includes(month)) {
        return response.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: `the month specified ('${month}') is not a valid month name ... ${JSON.stringify(
            validMonths,
          )}`,
        });
      }
    }

    return response
      .status(HttpStatus.OK)
      .send(await this.newsService.getAllNews(query));
  }

  @Get('process')
  async processNews(@Res() response) {
    try {
      await this.newsService.processNews();
      return response.status(HttpStatus.OK).send({
        success: true,
        message: 'News succesfully processed',
      });
    } catch (error) {
      let message = 'UNKNOWN ERROR';

      if (error === ERROR_FETCHING_FROM_API) message = ERROR_FETCHING_FROM_API;
      if (error === ERROR_INSERTING_NEWS) message = ERROR_INSERTING_NEWS;

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message,
      });
    }
  }

  @Delete('remove/:objectId')
  async deleteNews(@Param('objectId') id: string, @Res() response) {
    try {
      await this.newsService.removeNews(id);
      return response.status(HttpStatus.OK).send({
        success: true,
        message: 'News succesfully deleted',
      });
    } catch (error) {
      console.log(error);

      let message = 'UNKNOWN ERROR';
      if (error.message === ERROR_NEW_NOT_EXIST)
        message = 'The specified objectId do not exist in our database';
      return response.status(HttpStatus.BAD_REQUEST).send({
        error: true,
        message,
      });
    }

    return id;
  }
}
