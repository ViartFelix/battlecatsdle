import { tryFrom } from '#lib/enum_utils'

enum UnitRarity {
  Normal = 'normal',
  Special = 'special',
  Rare = 'rare',
  Super = 'super_rare',
  Uber = 'uber_rare',
  Legend = 'legend_rare',
}

export function isUnitRarity(value: unknown): value is UnitRarity {
  return tryFrom(UnitRarity, value) !== null
}

export default UnitRarity
