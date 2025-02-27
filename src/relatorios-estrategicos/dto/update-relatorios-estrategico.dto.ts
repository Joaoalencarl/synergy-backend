import { PartialType } from '@nestjs/mapped-types';
import { CreateRelatoriosEstrategicoDto } from './create-relatorios-estrategico.dto';

export class UpdateRelatoriosEstrategicoDto extends PartialType(CreateRelatoriosEstrategicoDto) {}
