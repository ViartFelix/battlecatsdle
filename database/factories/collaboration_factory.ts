import factory from '@adonisjs/lucid/factories'
import Collaboration from '#models/collaboration'
import { DateTime } from 'luxon'

export const CollaborationFactory = factory
  .define(Collaboration, async ({ faker }) => {
    return {
      label: faker.animal.fish(),
      key: faker.word.verb({ length: { min: 1, max: 3 } }),
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    }
  })
  .build()
