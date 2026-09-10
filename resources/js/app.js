import Alpine from 'alpinejs'
import { evolutionToHumanString, rarityToHumanString } from './util/unit_utils.js'

Alpine.data('alert', function () {
  return {
    isVisible: false,
    dismiss() {
      this.isVisible = false
    },
    init() {
      setTimeout(() => {
        this.isVisible = true
      }, 80)
      setTimeout(() => {
        this.dismiss()
      }, 5000)
    },
  }
})

Alpine.magic('rarityToHumanString', () => (rarity) => rarityToHumanString(rarity))
Alpine.magic('evolutionToHumanString', () => (evo) => evolutionToHumanString(evo))

// Guessed units by the player.
Alpine.store('guessed_units', {
  guessed: [],
  toGuess: null,
  add(unit) {
    this.guessed.push(unit)

    if( unit.id === this.toGuess.id ) {
      this.hasWon = true
    }
  },
  hasWon: false,
})

Alpine.start()
