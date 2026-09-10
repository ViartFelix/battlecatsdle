export function rarityToHumanString(rarity) {
  const rarityMap = {
    'normal': 'Normal',
    'special': 'Special',
    'rare': 'Rare',
    'super_rare': 'Super Rare',
    'uber_rare': 'Uber Rare',
    'legend_rare': 'Legend Rare',
  }

  return rarityMap[rarity] ?? 'Unknown Rare'
}

export function evolutionToHumanString(evolution) {
  const evolutionMap = {
    'normal': '1st form',
    'evolved': '2nd form',
    'true': 'True Form',
    'ultra': 'Ultra Form',
  }

  return evolutionMap[evolution] ?? 'Unknown Evolution'
}
