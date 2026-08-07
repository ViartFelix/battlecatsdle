import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'

export default class DailyUnit extends BaseCommand {
  static commandName = 'daily:unit'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    const today: DateTime = DateTime.now().toUTC()
    this.logger.info(`Starting daily unit command for '${today.toFormat('ccc dd/LL/yyyy')}'`)
  }
}
