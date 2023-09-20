import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async () => {
	await prisma.$transaction([prisma.user.deleteMany(), prisma.routine.deleteMany(), prisma.event.deleteMany()]);
};
