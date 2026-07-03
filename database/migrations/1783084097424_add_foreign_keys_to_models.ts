import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('unit_ability', (table) => {
      table.increments('id')

      table.integer('unit_id').unsigned().notNullable()
      table.foreign('unit_id').references('units.id')

      table.integer('ability_id').unsigned().notNullable()
      table.foreign('ability_id').references('abilities.id')
    })

    this.schema.createTable('unit_trait', (table) => {
      table.increments('id')

      table.integer('unit_id').unsigned().notNullable()
      table.foreign('unit_id').references('units.id')

      table.integer('trait_id').unsigned().notNullable()
      table.foreign('trait_id').references('traits.id')
    })

    this.schema.createTable('unit_collaboration', (table) => {
      table.increments('id')

      table.integer('unit_id').unsigned().notNullable()
      table.foreign('unit_id').references('units.id')

      table.integer('collaboration_id').unsigned().notNullable()
      table.foreign('collaboration_id').references('collaborations.id')
    })
  }

  async down() {
    this.schema.alterTable('unit_ability', (table) => {
      table.dropForeign(['unit_id', 'ability_id'])
      table.dropColumns('unit_id', 'ability_id')
    })

    this.schema.alterTable('unit_trait', (table) => {
      table.dropForeign(['unit_id', 'trait_id'])
      table.dropColumns('unit_id', 'trait_id')
    })

    this.schema.alterTable('unit_collaboration', (table) => {
      table.dropForeign(['unit_id', 'collaboration_id'])
      table.dropColumns('unit_id', 'collaboration_id')
    })

    this.schema.dropTableIfExists('unit_ability')
    this.schema.dropTableIfExists('unit_trait')
    this.schema.dropTableIfExists('unit_collaboration')
  }
}
