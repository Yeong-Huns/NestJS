import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../../common/entity/base.entity";
import {MovieDetail} from "./movie-detail.entity";
import {Director} from "../../director/entity/director.entity";


// ManyToOne  // Director -> 감독은 여러개의 영화를 가질 수 있음
// OneToOne // MovieDetail -> 영화는 하나의 상세 내용을 가질 수 있음
// ManyToMany // Genre -> 영화는 여러개의 장르를 가질 수 있고 장르는 여러개의 영화에 속할 수 있음


@Entity()
export class Movie extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    genre: string;

    @OneToOne(() => MovieDetail, movieDetail => movieDetail.id, { cascade: true })
    @JoinColumn()
    detail: MovieDetail;

    @ManyToOne(
        () => Director,
        director => director.movies,
        { cascade: true }
    )
    director: Director
}


