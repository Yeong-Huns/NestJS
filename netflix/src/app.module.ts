import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as Joi from "joi";
import {Movie} from "./movie/entity/movie.entity";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true, // ConfigModule 에 정의한 환경변수들을 어떤 모듈에서든 사용가능하게 함
          validationSchema: Joi.object({
              ENV: Joi.string().valid('dev', 'prod').required(),
              DB_TYPE: Joi.string().valid('postgres').required(),
              DB_HOST: Joi.string().required(),
              DB_PORT: Joi.number().required(),
              DB_USERNAME: Joi.string().required(),
              DB_PASSWORD: Joi.string().required(),
              DB_DATABASE: Joi.string().required(),
          }),
      }),
      /*TypeOrmModule.forRoot({
          type: process.env.DB_TYPE as "postgres",
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [],
          synchronize: true,
      })*/
      TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
              type: configService.get<string>("DB_TYPE") as "postgres",
              host: configService.get<string>("DB_HOST"),
              port: configService.get<number>("DB_PORT"),
              username: configService.get<string>("DB_USERNAME"),
              password: configService.get<string>("DB_PASSWORD"),
              database: configService.get<string>("DB_DATABASE"),
              entities: [
                  Movie,
              ],
              synchronize: true,
          }),
          inject: [ConfigService]
      }),
      MovieModule
  ],
})
export class AppModule {}
