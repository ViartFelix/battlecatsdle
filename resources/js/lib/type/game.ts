import { GuessStatus, GuessStatusDetail } from '../enum/guess_status.js'
import { Unit } from '../class/unit.js'

// one column that has been processed
export type GuessReturn = {
  primary: GuessStatus
  details?: GuessStatusDetail
}

// compacted result of the guess
export type ProcessedPlayerGuess = {
  unit: Unit,
  name: GuessReturn,
  cost: GuessReturn,
  rarity: GuessReturn,
  evolution: GuessReturn
}
