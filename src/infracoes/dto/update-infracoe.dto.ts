import { PartialType } from '@nestjs/mapped-types';
import { CreateInfracoeDto } from './create-infracoe.dto';
export class UpdateInfracoeDto extends PartialType(CreateInfracoeDto) {}
