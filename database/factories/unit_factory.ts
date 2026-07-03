import factory from '@adonisjs/lucid/factories'
import Unit from '#models/unit'
import { DateTime } from 'luxon'

export const UnitFactory = factory
  .define(Unit, async ({ faker }) => {
    const hasDescription: boolean = Math.random() > 0.5

    return {
      name: faker.animal.cat(),
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    }
  })
  .build()
