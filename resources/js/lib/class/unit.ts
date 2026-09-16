import UnitRarity from '#enums/unit_rarity'
import UnitEvolution from '#enums/unit_evolution'
import { JsonObject } from '#lib/type/json_object'
import { from } from '#lib/enum_utils'

/**
 * Front-end wrapper Unit entity class
 */
export class Unit {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly cost: number,
    readonly rarity: UnitRarity,
    readonly evolution: UnitEvolution,
    readonly description?: string,
    readonly image?: string
  ) {}

  static fromJson(json: string | JsonObject): Unit {
    const finalObject: JsonObject = typeof json === 'string'
      ? JSON.parse(json) as JsonObject
      : json

    return new Unit(
      Number(finalObject.id),
      String(finalObject.name),
      Number(finalObject.cost),
      from(UnitRarity, finalObject.rarity),
      from(UnitEvolution, finalObject.evolution),
      finalObject.description ? String(finalObject.description) : undefined,
      finalObject.image ? String(finalObject.image) : undefined,
    )
  }
}
