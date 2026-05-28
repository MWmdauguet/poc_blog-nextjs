import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../app/generated/prisma'
import argon2 from 'argon2'

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!)
const prisma = new PrismaClient({ adapter })

async function main() {
  const userCount = await prisma.user.count()
  if (userCount > 0) {
    console.log('⏭️ Fixtures déjà insérées, skip.')
    return
  }

  const admin = await prisma.user.create({
    data: { pseudo: 'admin', email: 'admin@example.com', password: await argon2.hash('password123', { type: argon2.argon2i }), role: 'admin' },
  })
  const alice = await prisma.user.create({
    data: { pseudo: 'alice', email: 'alice@example.com', password: await argon2.hash('password123', { type: argon2.argon2i }), role: 'user' },
  })
  const bob = await prisma.user.create({
    data: { pseudo: 'bob', email: 'bob@example.com', password: await argon2.hash('password123', { type: argon2.argon2i }), role: 'user' },
  })
  console.log('✅ Users insérés')

  await prisma.blog.createMany({
    data: [
      { title: 'Article Alice 1', content: "Contenu du premier article d'Alice.", picture: 'https://picsum.photos/seed/alice1/800/400', published: true, publishedById: alice.id },
      { title: 'Article Alice 2', content: "Contenu du deuxième article d'Alice.", picture: 'https://picsum.photos/seed/alice2/800/400', published: true, publishedById: alice.id },
      { title: 'Article Alice 3', content: "Brouillon d'Alice.", picture: 'https://picsum.photos/seed/alice3/800/400', published: false },
      { title: 'Article Bob 1', content: "Contenu du premier article de Bob.", picture: 'https://picsum.photos/seed/bob1/800/400', published: true, publishedById: bob.id },
      { title: 'Article Bob 2', content: "Contenu du deuxième article de Bob.", picture: 'https://picsum.photos/seed/bob2/800/400', published: true, publishedById: bob.id },
      { title: 'Article Bob 3', content: "Brouillon de Bob verrouillé.", picture: 'https://picsum.photos/seed/bob3/800/400', published: false, lockedById: admin.id, lockedAt: new Date() },
      { title: 'Article Admin 1', content: "Premier article de l'admin.", picture: 'https://picsum.photos/seed/admin1/800/400', published: true, publishedById: admin.id },
      { title: 'Article Admin 2', content: "Deuxième article de l'admin.", picture: 'https://picsum.photos/seed/admin2/800/400', published: true, publishedById: admin.id },
      { title: 'Article Admin 3', content: "Brouillon de l'admin.", picture: 'https://picsum.photos/seed/admin3/800/400', published: false, publishedById: admin.id },
    ],
  })
  console.log('✅ Blogs insérés')
  console.log('🌱 Toutes les fixtures insérées')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })