import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '#database/factories/user_factory'
import { TraitFactory } from '#database/factories/trait_factory'
import { AbilityFactory } from '#database/factories/ability_factory'
import { CollaborationFactory } from '#database/factories/collaboration_factory'
import { UnitFactory } from '#database/factories/unit_factory'
import type Trait from '#models/trait'
import type Ability from '#models/ability'
import type Collaboration from '#models/collaboration'
import type Unit from '#models/unit'
import { faker } from '@faker-js/faker'

/**
 * Main app seeder.
 */
export default class extends BaseSeeder {
  async run() {
    await UserFactory.createMany(5)
    const traits: Trait[] = await TraitFactory.createMany(10)
    const abilities: Ability[] = await AbilityFactory.createMany(25)
    const collaborations: Collaboration[] = await CollaborationFactory.createMany(3)

    const units: Unit[] = await UnitFactory.createMany(100)

    for (let unit of units) {
      const hasTraits: boolean = Math.random() < 0.7
      const chosenAbilities: number[] = faker.helpers
        .uniqueArray(abilities, faker.number.int({ min: 1, max: 15 }))
        .map((e) => e.id)

      if (hasTraits) {
        await unit
          .related('traits')
          .attach(
            faker.helpers
              .uniqueArray(traits, faker.number.int({ min: 1, max: 10 }))
              .map((e) => e.id)
          )

        await unit.related('abilities').attach(chosenAbilities)
      } else if (Math.random() > 0.5) {
        // 15% chance to have abilities without trait
        await unit.related('abilities').attach(chosenAbilities)
      }

      // collaborations
      if (Math.random() < 0.15) {
        await unit
          .related('collaborations')
          .attach(
            faker.helpers
              .uniqueArray(collaborations, faker.number.int({ min: 1, max: 3 }))
              .map((e) => e.id)
          )
      }
    }
  }
}
