import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testQuery() {
  try {
    console.log('Testing database query...');
    const transactions = await prisma.ticket.findMany();
    console.log('Transactions:', transactions);
  } catch (error) {
    console.error('Error during test query:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testQuery();