import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { MovieService } from './movie.service';
import {CreateMovieDto} from "./dto/create-movie.dto";
import {UpdateMovieDto} from "./dto/update-movie.dto";


@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() body: CreateMovieDto) {
    return this.movieService.create(body);
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
  update(@Param('id') id: string, @Body() body: UpdateMovieDto ) {
    return this.movieService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
