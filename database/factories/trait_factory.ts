import factory from '@adonisjs/lucid/factories'
import Trait from '#models/trait'
import { DateTime } from 'luxon'

export const TraitFactory = factory
  .define(Trait, async ({ faker }) => {
    return {
      label: faker.animal.horse(),
      key: faker.word.verb({ length: { min: 1, max: 3 } }),
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    }
  })
  .build()
