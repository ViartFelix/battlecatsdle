import { Unit } from '../class/unit.ts'

export type GuessedUnitsStore = {
  guessed: Unit[]
  toGuess: null | Unit
  hasWon: boolean

  // cache for the "isUnitInGuessed"
  _guessCache: Map<number, boolean>

  add(unit: Unit): void
  isUnitInGuessed(unitId: number): boolean
}
