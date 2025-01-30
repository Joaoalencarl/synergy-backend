import { PrismaService } from 'src/prisma/prisma.service';

export async function generateUniqueCustomId(
  length: number,
  prisma: PrismaService,
  model: string,
): Promise<string> {
  let id: string;
  let exists: boolean;

  do {
    id = generateCustomId(length);
    exists = await prisma[model].findUnique({
      where: { id },
    });
  } while (exists);

  return id;
}

function generateCustomId(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}
