import { Unit } from './unit.js'
import { GuessReturn, ProcessedPlayerGuess } from '../type/game.js'
import { GuessStatus, GuessStatusDetail } from '../enum/guess_status.js'
import { getOrderDifference } from '#lib/enum_utils'
import { unitEvolutionOrder } from '#enums/unit_evolution'
import { unitRarityOrder } from '#enums/unit_rarity'

/**
 * Processes the differences between the guessed unit and the unit to find.
 */
export default class UnitGuessProcessor {
  constructor(
    private readonly unit: Unit,
    private readonly toGuess: Unit
  ) {}

  public guessAllColumns(): Omit<ProcessedPlayerGuess, 'unit'> {
    return {
      name: this.guessUnitName(),
      cost: this.guessUnitCost(),
      evolution: this.guessUnitEvolution(),
      rarity: this.guessUnitRarity(),
    }
  }

  public guessUnitName(): GuessReturn {
    let primaryResult: GuessStatus

    if (this.unit.name === this.toGuess.name) {
      primaryResult = GuessStatus.CORRECT
    } else if (this.toGuess.name.includes(this.unit.name)) {
      primaryResult = GuessStatus.MAYBE
    } else {
      primaryResult = GuessStatus.INCORRECT
    }

    return {
      primary: primaryResult,
    }
  }

  public guessUnitCost(maybeWindowDifference: number = 150): GuessReturn {
    const rawDifference: number = this.toGuess.cost - this.unit.cost
    const difference: number = Math.abs(rawDifference)
    const details: GuessStatusDetail =
      rawDifference > 0 ? GuessStatusDetail.UP : GuessStatusDetail.DOWN

    if (difference === 0) {
      return {
        primary: GuessStatus.CORRECT,
      } as GuessReturn
    } else if (difference <= maybeWindowDifference) {
      return {
        primary: GuessStatus.MAYBE,
        details: details,
      } as GuessReturn
    } else {
      return {
        primary: GuessStatus.INCORRECT,
        details: details,
      }
    }
  }

  public guessUnitEvolution(): GuessReturn {
    const difference: number = getOrderDifference(
      unitEvolutionOrder,
      this.unit.evolution,
      this.toGuess.evolution
    )

    return {
      primary: difference === 0 ? GuessStatus.CORRECT : GuessStatus.INCORRECT,
    } as GuessReturn
  }

  public guessUnitRarity(): GuessReturn {
    const rawDifference: number = getOrderDifference(
      unitRarityOrder,
      this.unit.rarity,
      this.toGuess.rarity
    )

    if (rawDifference === 0) {
      return {
        primary: GuessStatus.CORRECT,
      } as GuessReturn
    } else if (Math.abs(rawDifference) === 1) {
      return {
        primary: GuessStatus.MAYBE,
      }
    } else {
      return {
        primary: GuessStatus.INCORRECT,
      }
    }
  }
}
