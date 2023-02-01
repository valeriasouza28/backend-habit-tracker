import {PrismaClient} from '@prisma/client';

export const prisma = new PrismaClient({
  // mostra todas as querys que são feitas no banco
    log: ['query']
  });