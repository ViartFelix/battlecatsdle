import { TraitSchema } from '#database/schema'
import { manyToMany } from '@adonisjs/lucid/orm'
import Unit from '#models/unit'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Trait extends TraitSchema {
  @manyToMany(() => Unit, {
    pivotTable: 'unit_trait',
  })
  declare units: ManyToMany<typeof Unit>
}
