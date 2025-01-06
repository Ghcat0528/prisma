const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function main() {
    const employees = [
        { name: 'Grace'},        
        { name: 'Logan'},
        { name: 'David'},
        { name: 'Ariana'},
        { name: 'Annabelle'},
        { name: 'Noah'},
        { name: 'Malachi'},
        { name: 'Ellie'},
        { name: 'Sophia'},
        { name: 'Morgan'},

    ];
    for (const employee of employees) {
        await prisma.employee.create({ data: employee });
    }
    console.log('Seeded')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

