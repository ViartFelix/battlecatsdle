import { BaseCommand, flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class FetchData extends BaseCommand {
  static commandName = 'fetch:data'
  static description = 'Fetches data from the Battle Cats'

  static options: CommandOptions = {}

  @flags.string()
  declare version: string

  async run() {
    if (!this.version) {
      this.logger.error('Please provide a BC (EN) version using the --version flag.')
      this.exitCode = 1
      return
    }

    // const url: string =
    //   `https://git.battlecatsmodding.org/fieryhenry/BCData/src/branch/main/game_data/en/${this.version}/resLocal`

    const url: string =
      ``

  }
}
