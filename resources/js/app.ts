import Alpine from 'alpinejs'
import { evolutionToHumanString, rarityToHumanString } from './util/unit_utils.ts'
import UnitEvolution from '#enums/unit_evolution'
import UnitRarity from '#enums/unit_rarity'
import { GuessedUnitsStore } from './lib/type/alpine_js.js'
import { Unit } from './lib/class/unit.js'

Alpine.data('alert', function () {
  return {
    isVisible: false,
    dismiss(): void {
      this.isVisible = false
    },
    init(): void {
      setTimeout((): void => {
        this.isVisible = true
      }, 80)
      setTimeout((): void => {
        this.dismiss()
      }, 5000)
    },
  }
})

Alpine.magic('rarityToHumanString', () => (rarity: UnitRarity) => rarityToHumanString(rarity))
Alpine.magic('evolutionToHumanString', () => (evo: UnitEvolution) => evolutionToHumanString(evo))

// Guessed units by the player.
Alpine.store('guessed_units', {
  guessed: [],
  toGuess: null,
  hasWon: false,

  // retains the unit ID only, to avoid O(N) search on every click (is O(1) instead)
  _guessCache: new Map(),

  add(unit: Unit): void {
    if( null === this.toGuess ) return;
    if( this._guessCache.has(unit.id) ) return;

    this.guessed.push(unit)
    this._guessCache.set(unit.id, true)

    if (unit.id === this.toGuess.id) {
      this.hasWon = true
    }
  },

  isUnitInGuessed(unitId: number): boolean {
    return this._guessCache.has(unitId)
  }
} as GuessedUnitsStore)

Alpine.start()
