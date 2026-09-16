import UnitRarity from '#enums/unit_rarity'
import UnitEvolution from '#enums/unit_evolution'

const rarityMap: Record<UnitRarity, string> = {
  normal: 'Normal',
  special: 'Special',
  rare: 'Rare',
  super_rare: 'Super Rare',
  uber_rare: 'Uber Rare',
  legend_rare: 'Legend Rare',
}

const evolutionMap: Record<UnitEvolution, string> = {
  normal: '1st form',
  evolved: '2nd form',
  true: 'True Form',
  ultra: 'Ultra Form',
}

export function rarityToHumanString(rarity: UnitRarity): string {
  return rarityMap[rarity] ?? 'Unknown Rare'
}

export function evolutionToHumanString(evolution: UnitEvolution) {
  return evolutionMap[evolution] ?? 'Unknown Evolution'
}
