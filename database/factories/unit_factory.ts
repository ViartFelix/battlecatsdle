import factory from '@adonisjs/lucid/factories'
import Unit from '#models/unit'
import { DateTime } from 'luxon'
import UnitRarity from '../../app/enums/unit_rarity.js'
import UnitEvolution from '../../app/enums/unit_evolution.js'
import { AbilityFactory } from '#database/factories/ability_factory'
import { TraitFactory } from '#database/factories/trait_factory'
import { CollaborationFactory } from '#database/factories/collaboration_factory'

export const UnitFactory = factory
  .define(Unit, async ({ faker }) => {
    const hasDescription: boolean = Math.random() > 0.5

    return {
      name: faker.animal.cat(),
      description: hasDescription ? faker.lorem.sentences({ min: 1, max: 3 }) : null,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      evolution: faker.helpers.enumValue(UnitEvolution),
      image: faker.image.url(),
      rarity: faker.helpers.enumValue(UnitRarity),
      cost: faker.number.int({ min: 50, max: 6200 }),
    }
  })
  .relation('abilities', () => AbilityFactory)
  .relation('traits', () => TraitFactory)
  .relation('collaborations', () => CollaborationFactory)
  .build()
