import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'abilities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('label', 64).notNullable()
      table.string('key', 16).unique().notNullable()
      table.boolean('on_trait')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
