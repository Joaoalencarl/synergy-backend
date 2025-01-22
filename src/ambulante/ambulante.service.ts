import { Injectable } from '@nestjs/common';
import { CreateAmbulanteDto } from './dto/create-ambulante.dto';
import { UpdateAmbulanteDto } from './dto/update-ambulante.dto';

@Injectable()
export class AmbulanteService {
  create(createAmbulanteDto: CreateAmbulanteDto) {
    return 'This action adds a new ambulante';
  }

  findAll() {
    return `This action returns all ambulante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ambulante`;
  }

  update(id: number, updateAmbulanteDto: UpdateAmbulanteDto) {
    return `This action updates a #${id} ambulante`;
  }

  remove(id: number) {
    return `This action removes a #${id} ambulante`;
  }
}
