import { DailyUnitSchema } from '#database/schema'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import Unit from '#models/unit'
import { belongsTo } from '@adonisjs/lucid/orm'

export default class DailyUnit extends DailyUnitSchema {
  @belongsTo(() => Unit)
  declare unit: BelongsTo<typeof Unit>
}
