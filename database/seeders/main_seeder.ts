import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '#database/factories/user_factory'
import { TraitFactory } from '#database/factories/trait_factory'
import { AbilityFactory } from '#database/factories/ability_factory'
import { CollaborationFactory } from '#database/factories/collaboration_factory'

/**
 * Main app seeder.
 */
export default class extends BaseSeeder {
  async run() {
    await UserFactory.createMany(5)
    await TraitFactory.createMany(10)
    await AbilityFactory.createMany(25)
    await CollaborationFactory.createMany(3)
  }
}
