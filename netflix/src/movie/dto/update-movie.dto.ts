import {Equals, IsDefined, IsEmpty, IsIn, IsNotEmpty, IsNotIn, IsOptional, NotEquals} from "class-validator";

export class UpdateMovieDto{
    @IsNotEmpty()
    @IsOptional()
    title?: string;

    @IsNotEmpty()
    @IsOptional()
    genre?: string;


    //@IsDefined() // null || undefined
    //@IsOptional() // 만약 값 자체가 정의되지 않았다면, 다른 데코레이터를 실행하지 않는다.
    //@Equals('Ive') // 반드시 값이 Ive 여야만 한다.
    //@NotEquals('Ive') // 값은 반드시 Ive 가 아니여야한다.
    //@IsEmpty() // null || undefined || '' 여야만 한다.
    //@IsNotEmpty() // null || undefined || '' 가 아니여야한다.
    //@IsIn(['action', 'fantasy']) // 이 파라미터는 리스트 내에 있는 값이여야 한다.
    @IsNotIn(['action', 'fantasy'])
    test: string;
}