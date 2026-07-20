import factory from '@adonisjs/lucid/factories'
import Trait from '#models/trait'
import { DateTime } from 'luxon'
import { UnitFactory } from '#database/factories/unit_factory'

export const TraitFactory = factory
  .define(Trait, async ({ faker }) => {
    return {
      label: faker.animal.horse(),
      key: faker.helpers.uniqueArray(faker.word.verb, 1)[0],
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    }
  })
  .relation('units', () => UnitFactory)
  .build()
