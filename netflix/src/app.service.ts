import {Injectable, NotFoundException} from '@nestjs/common';

export interface Movie {
  id: number;
  title: string;
}

@Injectable()
export class AppService {
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

  getManyMovies(title?: string){
    if(!title) return this.movies;
    return this.movies.filter(movie => movie.title.startsWith(title));
  }

  getMovieById(id: string){
    const movie = this.movies.find(movie => movie.id === +id);
    if(!movie) throw new NotFoundException('해당하는 ID 의 영화를 찾을 수 없습니다.');
    return movie;
  }

  postMovie(title: string){
    const movie: Movie = {
      id: this.idCounter++,
      title: title
    }
    this.movies.push(movie);
    return movie;
  }

  patchMovie(id: string, title: string){
    const movie = this.movies.find(movie => movie.id === +id);
    if(!movie) throw new NotFoundException('해당하는 ID 의 영화를 찾을 수 없습니다.');
    Object.assign(movie, {title});
    return movie;
  }

  deleteMovieById(id: string){
    const index = this.movies.findIndex(movie => movie.id === +id);
    if(index === -1) throw new NotFoundException('해당하는 ID 의 영화를 찾을 수 없습니다.');
    this.movies.splice(index, 1);
    return id;
  }
}
