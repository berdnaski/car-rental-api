import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  const cars = await prisma.car.createMany({
    data: [
      {
        licensePlate: 'ABC1234',
        color: 'Prata',
        brand: 'Toyota',
      },
      {
        licensePlate: 'DEF5678',
        color: 'Preto',
        brand: 'Honda',
      },
      {
        licensePlate: 'GHI9012',
        color: 'Branco',
        brand: 'Ford',
      },
      {
        licensePlate: 'JKL3456',
        color: 'Vermelho',
        brand: 'Chevrolet',
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${cars.count} cars`);

  const drivers = await prisma.driver.createMany({
    data: [
      {
        name: 'João Silva',
      },
      {
        name: 'Maria Santos',
      },
      {
        name: 'Pedro Oliveira',
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${drivers.count} drivers`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });