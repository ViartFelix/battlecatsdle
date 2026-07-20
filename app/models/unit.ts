import { UnitSchema } from '#database/schema'
import { type ManyToMany } from '@adonisjs/lucid/types/relations'
import Ability from '#models/ability'
import { manyToMany } from '@adonisjs/lucid/orm'
import Trait from '#models/trait'
import Collaboration from '#models/collaboration'

export default class Unit extends UnitSchema {
  @manyToMany(() => Ability, {
    pivotTable: 'unit_ability',
  })
  declare abilities: ManyToMany<typeof Ability>

  @manyToMany(() => Trait, {
    pivotTable: 'unit_trait',
  })
  declare traits: ManyToMany<typeof Trait>

  @manyToMany(() => Collaboration, {
    pivotTable: 'unit_collaboration',
  })
  declare collaborations: ManyToMany<typeof Collaboration>
}
