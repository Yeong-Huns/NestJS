import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { MovieService } from './movie.service';


@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body('title') title:string) {
    return this.movieService.create(title);
  }

  @Get()
  findAll(@Query('title')title?: string) {
    return this.movieService.findAll(title);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('title') title: string ) {
    return this.movieService.update(+id, title);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
