import { SetMetadata } from '@nestjs/common';

export const ADMIN_TYPES_KEY = 'adminTypes';
export const AdminTypes = (...adminTypes: string[]) =>
  SetMetadata(ADMIN_TYPES_KEY, adminTypes);
