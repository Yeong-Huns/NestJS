import { Controller, Get, Post, Delete, Patch, Param, NotFoundException, Body, Query} from '@nestjs/common';
import { AppService } from './app.service';


@Controller('movie')
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies(
      @Query('title')title?: string,
  ){
    /**
     * todo title 쿼리의 타입이 string 인지 검증하는 코드 추가
     */
    return this.appService.getManyMovies(title);
  }

  @Get(':id')
  getMovieById(@Param('id') id: string){
    return this.appService.getMovieById(id);
  }

  @Post()
  postMovie(
      @Body('title') title: string,
  ){
    return this.appService.postMovie(title);
  }

  @Patch(':id')
  patchMovieById(
      @Param('id') id: string,
      @Body('title') title: string,
  ){
    return this.appService.patchMovie(id, title);
  }

  @Delete(':id')
  deleteMovieById(
      @Param('id') id: string,
  ){
    return this.appService.deleteMovieById(id);
  }
}
