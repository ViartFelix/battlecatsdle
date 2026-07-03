import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'units'

  private evolutions_enum_name: string = 'e_unit_evo'
  private evolutions: string[] = ['normal', 'evolved', 'true', 'ultra']

  private rarity_enum_name: string = 'e_unit_rarity'
  private rarities: string[] = [
    'normal',
    'special',
    'rare',
    'super_rare',
    'uber_rare',
    'legend_rare',
  ]

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name', 128).notNullable()
      table.string('description', 1024).nullable()
      table.integer('cost').notNullable()
      table
        .enum('evolution', this.evolutions, {
          useNative: true,
          enumName: this.evolutions_enum_name,
          existingType: false,
        })
        .notNullable()

      table
        .enum('rarity', this.rarities, {
          useNative: true,
          enumName: this.rarity_enum_name,
          existingType: false,
        })
        .notNullable()

      table.string('image', 256).nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
