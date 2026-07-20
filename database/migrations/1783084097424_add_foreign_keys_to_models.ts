import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('unit_ability', (table) => {
      table.increments('id')

      table.integer('unit_id').unsigned().notNullable()
      table.foreign('unit_id').references('units.id').onDelete('CASCADE')

      table.integer('ability_id').unsigned().notNullable()
      table.foreign('ability_id').references('abilities.id')
    })

    this.schema.createTable('unit_trait', (table) => {
      table.increments('id')

      table.integer('unit_id').unsigned().notNullable()
      table.foreign('unit_id').references('units.id').onDelete('CASCADE')

      table.integer('trait_id').unsigned().notNullable()
      table.foreign('trait_id').references('traits.id')
    })

    this.schema.createTable('unit_collaboration', (table) => {
      table.increments('id')

      table.integer('unit_id').unsigned().notNullable()
      table.foreign('unit_id').references('units.id').onDelete('CASCADE')

      table.integer('collaboration_id').unsigned().notNullable()
      table.foreign('collaboration_id').references('collaborations.id')
    })
  }

  async down() {
    this.schema.dropTableIfExists('unit_ability')
    this.schema.dropTableIfExists('unit_trait')
    this.schema.dropTableIfExists('unit_collaboration')
  }
}
