import { UnitSchema } from '#database/schema'
import { type HasMany, type ManyToMany } from '@adonisjs/lucid/types/relations'
import Ability from '#models/ability'
import { hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Trait from '#models/trait'
import Collaboration from '#models/collaboration'
import DailyUnit from '#models/daily_unit'

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

  @hasMany(() => DailyUnit)
  declare dailyUnits: HasMany<typeof DailyUnit>
}
