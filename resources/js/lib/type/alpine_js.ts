import { Unit } from '../class/unit.ts'
import { ProcessedPlayerGuess } from './game.js'

export type GuessedUnitsStore = {
  guessed: ProcessedPlayerGuess[]
  toGuess: null | Unit
  hasWon: boolean

  // cache for the "isUnitInGuessed"
  _guessCache: Map<number, boolean>

  add(unit: Unit): void
  isUnitInGuessed(unitId: number): boolean
}
