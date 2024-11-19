import {Exclude, Expose} from "class-transformer";

@Exclude() // 모든 프로퍼티를 숨김
export class Movie{
    id: number;

    @Expose() // 노출할 프로퍼티
    title: string;

    //@Exclude() // 직렬화시 해당 값을 노출하지 않음
    @Expose() // 직렬화시 해당 값을 노출함
    genre: string;

}