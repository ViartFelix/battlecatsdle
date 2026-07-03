import { AbilitySchema } from '#database/schema'
import { type ManyToMany } from '@adonisjs/lucid/types/relations'
import Unit from '#models/unit'
import { manyToMany } from '@adonisjs/lucid/orm'

export default class Ability extends AbilitySchema {
  @manyToMany(() => Unit, {
    pivotTable: 'unit_ability',
  })
  declare units: ManyToMany<typeof Unit>
}
