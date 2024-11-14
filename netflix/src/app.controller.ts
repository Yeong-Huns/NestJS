import { Controller, Get, Post, Delete, Patch, Param, NotFoundException, Body, Query} from '@nestjs/common';
import { AppService } from './app.service';

interface Movie {
  id: number;
  title: string;
}

@Controller('movie')
export class AppController {
  private movies : Movie[] = [
    {
      id:1,
      title: '해리포터',

    },
    {
      id:2,
      title: '반지의 제왕',
    }
  ];

  private idCounter = 3;

  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies(
      @Query('title')title?: string,
  ){
    if(!title) return this.movies;

    return this.movies.filter(movie => movie.title.startsWith(title));
  }

  @Get(':id')
  getMovie(@Param('id') id: string){
    const movie = this.movies.find(m=> m.id === +id);
    if(!movie) throw new NotFoundException('존재하지 않는 ID 의 영화입니다.')
    return movie;
  }

  @Post()
  postMovie(
      @Body('title') title: string,
  ){
    const movie: Movie = {
      id: this.idCounter++,
      title: title,
    };
    this.movies.push(
        movie,
    );
    return movie;
  }

  @Patch(':id')
  patchMovie(
      @Param('id') id: string,
      @Body('title') title: string,
  ){
    const movie = this.movies.find(m => m.id === +id);
    if(!movie) throw new NotFoundException('존재하지 않는 ID 의 영화입니다.')
    Object.assign(movie, {title});
    //movie.title = title;
    return movie;
  }

  @Delete(':id')
  deleteMovie(
      @Param('id') id: string,
  ){
    const index = this.movies.findIndex(movie => movie.id === +id);
    if(index === -1) throw new NotFoundException('존재하지 않는 ID 의 영화입니다.');
    this.movies.splice(index, 1); // 원본 배열에서 삭제
    return id;
  }
}
