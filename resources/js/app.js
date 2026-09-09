import Alpine from 'alpinejs'

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

// Guessed units by the player.
Alpine.store('guessed_units', {
  guessed: [],
  add(unit) {
    this.guessed.push(unit)
  },
})

Alpine.start()
