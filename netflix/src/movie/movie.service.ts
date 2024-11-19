import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateMovieDto} from "./dto/create-movie.dto";
import {UpdateMovieDto} from "./dto/update-movie.dto";
import {Movie} from "./entity/movie.entity";

@Injectable()
export class MovieService {
    private movies: Movie[] = [];
    private idCounter = 3;

    constructor() {
        const movie1 = new Movie();
        movie1.id = 1;
        movie1.title = '해리포터';
        movie1.genre = 'fantasy';

        const movie2 = new Movie();
        movie2.id = 2;
        movie2.title = '매드맥스';
        movie2.genre = 'action';

        this.movies.push(movie1, movie2);
    }

    create(createMovieDto: CreateMovieDto) {
        const movie: Movie = {
            id: this.idCounter++,
            ...createMovieDto,
        }
        this.movies.push(movie);
        return movie;
    }

    findAll(title?: string) {
        console.log(this.movies);

        if (!title) return this.movies;
        return this.movies.filter(m => m.title.startsWith(title));
    }

    findOne(id: number) {
        const movie = this.movies.find(movie => movie.id === id);
        if (!movie) throw new NotFoundException('해당하는 ID의 영화를 찾을 수 없습니다.');
        return movie;
    }

    update(id: number, updateMovieDto: UpdateMovieDto) {
        const movie = this.movies.find(movie => movie.id === id);
        if (!movie) throw new NotFoundException('해당하는 ID의 영화를 찾을 수 없습니다.');
        Object.assign(movie, updateMovieDto);
        return movie;
    }

    remove(id: number) {
        const idx = this.movies.findIndex(movie => movie.id === id);
        if (idx === -1) throw new NotFoundException('해당하는 ID의 영화를 찾을 수 없습니다.');
        this.movies.splice(idx, 1);
        return id;
    }
}
