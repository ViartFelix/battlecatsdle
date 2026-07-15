import factory from '@adonisjs/lucid/factories'
import Ability from '#models/ability'
import { DateTime } from 'luxon'

export const AbilityFactory = factory
  .define(Ability, async ({ faker }) => {
    return {
      label: faker.animal.dog(),
      key: faker.helpers.uniqueArray(faker.word.verb, 1)[0],
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    }
  })
  .build()
