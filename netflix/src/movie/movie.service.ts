import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateMovieDto} from "./dto/create-movie.dto";
import {UpdateMovieDto} from "./dto/update-movie.dto";
import {Movie} from "./entity/movie.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Like, Repository} from "typeorm";
import {MovieDetail} from "./entity/movie-detail.entity";
import {Director} from "../director/entity/director.entity";

@Injectable()
export class MovieService {

    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
        @InjectRepository(MovieDetail)
        private readonly movieDetailRepository: Repository<MovieDetail>,
        @InjectRepository(Director)
        private readonly directorRepository: Repository<Director>

    ) {}

    async create(createMovieDto: CreateMovieDto) {

        const director = await this.directorRepository.findOne({
            where: {
                id: createMovieDto.directorId
            }
        })

        if(!director) throw new NotFoundException("해당하는 ID의 감독은 존재하지 않습니다.");

        return await this.movieRepository.save({
            title: createMovieDto.title,
            genre: createMovieDto.genre,
            detail: { detail: createMovieDto.detail },
            director,
        });

    }

    async findAll(title?: string) {
        // 나중에 title 필터 기능 추가하기
        if(!title){
            return [await this.movieRepository.find({
                relations: [ 'director' ]
            }), await this.movieRepository.count()];
        }
        return this.movieRepository.findAndCount({
            where: {
                title: Like(`%${title}%`)
            }
        })
        /*if (!title) return this.movies;
        return this.movies.filter(m => m.title.startsWith(title));*/
    }

    async findOne(id: number) {
        const movie = await this.movieRepository.findOne({
            where: {id},
            relations: ['detail', 'director']
        });
        if(!movie) throw new NotFoundException('해당하는 ID 의 영화는 존재하지 않습니다.');
        return movie;
    }

    async update(id: number, updateMovieDto: UpdateMovieDto) {
        const movie = await this.movieRepository.findOne({
            where: {id},
            relations: ['detail']
        });
        if(!movie) throw new NotFoundException('해당하는 ID의 영화는 존재하지 않습니다.');

        const {detail, directorId, ...movieRest} = updateMovieDto;

        let newDirector: Director;

        if(directorId){
            const director = await this.directorRepository.findOne({
                where: {
                    id: directorId
                }
            });
            if(!director) throw new NotFoundException("해당하는 ID의 감독은 존재하지 않습니다.");
            newDirector = director;
        }

        const movieUpdateFields = {
            ...movieRest,
            ...(newDirector && { director: newDirector })
        }

        await this.movieRepository.update(
            {id},
            movieUpdateFields,
        );

        if(detail){
            await this.movieDetailRepository.update(
                { id:movie.detail.id },
                { detail }
            )
        }

        const newMovie = await this.movieRepository.findOne({
            where: {id},
            relations: ['detail', 'director']
        });

        if(!newMovie) throw new NotFoundException('해당 ID 로 업데이트 된 결과가 존재하지 않습니다.');
        return newMovie;
    }

    async remove(id: number) {
        const movie = await this.movieRepository.findOne({
            where: {id},
            relations: ['detail']
        });
        if(!movie) throw new NotFoundException('해당하는 ID의 영화는 존재하지 않습니다.');
        await this.movieRepository.delete(id);
        await this.movieDetailRepository.delete(movie.detail.id);
        return id;
    }
}
