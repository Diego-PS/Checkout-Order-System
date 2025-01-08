import { Seeder } from '@database'

const seeder = new Seeder()
seeder.seed().catch((error) => console.log('Seed failed', error))
