import { PartialType } from '@nestjs/mapped-types';
import { CreateLocalizationDto } from 'src/denuncia/dto/create-denuncia.dto';

export class UpdateInfracoeDto extends PartialType(CreateLocalizationDto) {}
