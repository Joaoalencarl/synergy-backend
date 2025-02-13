import { PartialType } from '@nestjs/mapped-types';
import { CreateMessagetDto } from './create-message';

export class UpdateMessagetDto extends PartialType(CreateMessagetDto) {}
