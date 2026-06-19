import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { DateTime } from 'luxon'

const DEFAULT_FACTORY_PASSWORD: string = 'password'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: DEFAULT_FACTORY_PASSWORD,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    }
  })
  .build()
