import { CollaborationSchema } from '#database/schema'
import { manyToMany } from '@adonisjs/lucid/orm'
import Unit from '#models/unit'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Collaboration extends CollaborationSchema {
  @manyToMany(() => Unit, {
    pivotTable: 'unit_collaboration',
  })
  declare units: ManyToMany<typeof Unit>
}
