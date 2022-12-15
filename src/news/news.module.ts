import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsPgRepository } from "./news-respository";
import { NewsController } from "./news.controller";
import { News } from "./news.entity";
import { NewsService } from "./news.service";

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  controllers: [NewsController],
  providers: [NewsService, NewsPgRepository],
  exports: [],
})
export class NewsModule {}

