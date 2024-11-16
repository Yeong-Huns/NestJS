import {
    Equals,
    IsArray,
    IsBoolean,
    IsDate,
    IsDateString,
    IsDefined,
    IsEmpty,
    IsEnum,
    IsIn,
    IsInt,
    IsNotEmpty,
    IsNotIn,
    IsNumber,
    IsOptional,
    IsString,
    NotEquals, registerDecorator, Validate,
    ValidationArguments, ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

enum MovieGenre{
    FANTASY = 'fantasy',
    ACTION = 'action'
}

@ValidatorConstraint()
class PasswordValidator implements ValidatorConstraintInterface{
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        // 비밀번호 길이는 4-8
        return value.length > 4 && value.length < 8;
    }
    defaultMessage(validationArguments?: ValidationArguments): string {
        return '비밀번호의 길이는 4~8자 여야합니다. 입력된 비밀번호 ($value)'
    }
}

function IsPasswordValid(validationOptions?: ValidationOptions){
    return function(object: Object, propertyName: string){
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: PasswordValidator,
        })
    }
}

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
    //@IsNotIn(['action', 'fantasy'])
    //@IsBoolean() // 값(value) 가 Boolean 타입인지 검사한다. (true, false) 는 가능하지만, "true", "false"는 불가
    //@IsString() // 값은 string 이여야 한다.
    //@IsNumber() // 숫자인지 아닌지
    //@IsInt() // 정수인지 아닌지 (소수 불가)
    //@IsArray() // 값이 Array 인지 아닌지 확인
    //@IsEnum(MovieGenre)
    //@IsDateString() // 2024-07-07T12:00:00.000Z 형식
    @Validate(PasswordValidator)
    test: string;
}