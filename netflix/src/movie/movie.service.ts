import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateMovieDto} from "./dto/create-movie.dto";
import {UpdateMovieDto} from "./dto/update-movie.dto";

export interface Movie {
    id: number;
    title: string;
    genre: string;
}

@Injectable()
export class MovieService {
    private movies: Movie[] = [
        {
            id: 1,
            title: '해리포터',
            genre: 'fantasy'
        },
        {
            id: 2,
            title: '신밧드의 모험',
            genre: 'fantasy'
        },
    ];
    private idCounter = 3;

    create(createMovieDto: CreateMovieDto) {
        const movie : Movie = {
            id: this.idCounter++,
            ...createMovieDto,
        }
        this.movies.push(movie);
        return movie;
    }

    findAll(title?: string) {
        if(!title) return this.movies;
        return this.movies.filter(m => m.title.startsWith(title));
    }

    findOne(id: number) {
        const movie = this.movies.find(movie => movie.id === id);
        if(!movie) throw new NotFoundException('해당하는 ID의 영화를 찾을 수 없습니다.');
        return movie;
    }

    update(id: number, updateMovieDto: UpdateMovieDto) {
        const movie = this.movies.find(movie => movie.id === id);
        if(!movie) throw new NotFoundException('해당하는 ID의 영화를 찾을 수 없습니다.');
        Object.assign(movie, updateMovieDto);
        return movie;
    }

    remove(id: number) {
        const idx = this.movies.findIndex(movie => movie.id === id);
        if(idx === -1) throw new NotFoundException('해당하는 ID의 영화를 찾을 수 없습니다.');
        this.movies.splice(idx, 1);
        return id;
    }
}
