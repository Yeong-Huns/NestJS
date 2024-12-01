import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Director} from "./entity/director.entity";
import {Repository} from "typeorm";

@Injectable()
export class DirectorService {
  constructor(
      @InjectRepository(Director)
      private readonly directorRepository: Repository<Director>,
  ) {}

  async create(createDirectorDto: CreateDirectorDto) {
    return await this.directorRepository.save(createDirectorDto);
  }

  async findAll() {
    return await this.directorRepository.find()
  }

  async findOne(id: number) {
    const movie = await this.directorRepository.findOne({
      where: {id},
    });
    if(!movie) throw new NotFoundException("해당 ID를 가진 감독은 존재하지 않습니다");
    return movie;
  }

  async update(id: number, updateDirectorDto: UpdateDirectorDto) {
    const existDirector = await this.directorRepository.findOne({
      where: {id}
    });

    if(!existDirector) throw new NotFoundException("해당 ID를 가진 감독은 존재하지 않습니다.");

    await this.directorRepository.update({id},{...updateDirectorDto});

    return await this.directorRepository.findOne({
      where: {id}
    })
  }

  async remove(id: number) {
    const movie = await this.directorRepository.findOne({
      where: {id}
    });
    if(!movie) throw new NotFoundException("해당 ID를 가진 감독은 존재하지 않습니다.")
    await this.directorRepository.delete({id});
    return id;
  }
}
