import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
    },
  });
  console.log('Admin user created:', admin.email);

  const roomsData = [
    { name: 'Classroom A', type: 'Classroom', capacity: 30 },
    { name: 'Laboratory 1', type: 'Lab', capacity: 20 },
    { name: 'Study Room 101', type: 'Study', capacity: 10 },
  ];

  for (const room of roomsData) {
    const r = await prisma.room.upsert({
      where: { name: room.name },
      update: {},
      create: room,
    });
    console.log('Room created:', r.name);
  }

  console.log('Seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
