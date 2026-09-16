import { tryFrom } from '#lib/enum_utils'

enum UnitEvolution {
  Normal = 'normal',
  Evolved = 'evolved',
  True = 'true',
  Ultra = 'ultra',
}

export function isUnitEvolution(value: unknown): value is UnitEvolution {
  return tryFrom(UnitEvolution, value) !== null
}

export default UnitEvolution
