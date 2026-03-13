const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const hashed = await bcrypt.hash('Admin@1234', 10)
  const user = await prisma.user.create({
    data: {
      name:     'Admin',
      email:    'admin@mbeleemaisha.com',
      password: hashed,
      role:     'admin',
    },
  })
  console.log('✅ Admin created:', user.email)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
