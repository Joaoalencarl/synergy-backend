import { PartialType } from '@nestjs/mapped-types';
import { CreateAmbulanteDto } from './create-ambulante.dto';

export class UpdateAmbulanteDto extends PartialType(CreateAmbulanteDto) {}
