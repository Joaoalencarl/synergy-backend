import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissoesDto } from './permissoes.dto';

export class UpdatePermissoesDto extends PartialType(CreatePermissoesDto) {}
