import factory from '@adonisjs/lucid/factories'
import Collaboration from '#models/collaboration'
import { DateTime } from 'luxon'
import { UnitFactory } from '#database/factories/unit_factory'

export const CollaborationFactory = factory
  .define(Collaboration, async ({ faker }) => {
    return {
      label: faker.animal.fish(),
      key: faker.helpers.uniqueArray(faker.word.verb, 1)[0],
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    }
  })
  .relation('units', () => UnitFactory)
  .build()
