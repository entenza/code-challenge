import { Controller, Delete, Get, HttpStatus, Param, Put, Query, Res } from '@nestjs/common';
import {
  ERROR_FETCHING_FROM_API,
  ERROR_INSERTING_NEWS,
} from 'src/common/errors';
import { GetNewsRequest } from 'src/common/request/getNews.request';


import { NewsService } from './news.service';
import { validMonths } from '../common/validMonths';

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
      response.status(HttpStatus.OK).send({
        success: true,
        message: 'News succesfully processed',
      });
    } catch (error) {
      let message = 'UNKNOWN ERROR';

      if (error === ERROR_FETCHING_FROM_API) message = ERROR_FETCHING_FROM_API;
      if (error === ERROR_INSERTING_NEWS) message = ERROR_INSERTING_NEWS;

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message,
      });
    }

    return {};
  }

  @Delete('remove/:objectId')
  async deleteNews(@Param('objectId') id: number) {
    return id;
  }
}

