import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'daily_units'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('unit_id').unsigned().notNullable()
      table.foreign('unit_id').references('units.id').onDelete('CASCADE')

      // flag to prevent the update of the daily unit.
      table.boolean('overridable').notNullable().defaultTo(false)

      table.date('day').unique().notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
