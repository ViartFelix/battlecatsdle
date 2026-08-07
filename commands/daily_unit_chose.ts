import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'
import DailyUnit from '#models/daily_unit'
import schedulerConfig from '#config/schedulers'
import Unit from '#models/unit'

export default class DailyUnitChose extends BaseCommand {
  static commandName = 'daily:unit'
  static description = 'Chooses a unit randomly from the db to be chosen for today.'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const config = schedulerConfig.daily_unit_chose
    const today: DateTime = DateTime.now().toUTC()

    this.logger.info(`Starting daily unit command for '${today.toFormat('ccc dd/LL/yyyy')}'`)

    const entriesToIgnore: Unit[] = await this.getLastEntriesToIgnore(config.ignore_last_x_units)
    const possibleCandidates: Unit[] = await this.getDailyCandidates(entriesToIgnore)

    this.logger.info(
      `Ignored ${entriesToIgnore.length} units. Possible candidates: ${possibleCandidates.length}.`
    )

    const chosenId: number =
      possibleCandidates[Math.floor(Math.random() * possibleCandidates.length)].id
    const chosenUnit: Unit = await Unit.findOrFail(chosenId)

    this.logger.info(`Chosen unit: ${chosenUnit.name} (ID: ${chosenUnit.id}). Creating entry...`)

    await this.insertChosen(chosenId, today)

    this.logger.success(
      `Successfully added unit '${chosenUnit.name}' (#${chosenUnit.id}) to the daily unit for the ${today.toFormat('ccc dd/LL/yyyy')}.`
    )

    await this.terminate()
  }

  /**
   * Returns the units to ignore for the candidates of the daily guess.
   * @private
   */
  private async getLastEntriesToIgnore(count: number = 5): Promise<Unit[]> {
    if (count < 1) return []

    const alreadySeen: Set<Unit> = new Set()

    const entries: DailyUnit[] = await DailyUnit.query().orderBy('day', 'desc').limit(count).exec()
    for (const entry of entries) {
      await entry.load('unit')
      alreadySeen.add(entry.unit)
    }

    return alreadySeen.values().toArray()
  }

  /**
   * Returns all the candidates for the daily question, minus what is ignored
   * @private
   */
  private async getDailyCandidates(ignored: Unit[] = []): Promise<Unit[]> {
    const ignoredIDs: number[] = ignored.map((u: Unit) => u.id)

    // I'll not fetch the whole objects since it can take a big portion of memory : i just need the p key
    return await Unit.query().select('id').whereNotIn('id', ignoredIDs).exec()
  }

  /**
   * Inserts the chosen unit with this ID in the daily table
   * @private
   */
  private async insertChosen(id: number, date: DateTime): Promise<DailyUnit> {
    const now: DateTime = DateTime.now()

    return DailyUnit.create({
      unitId: id,
      day: date,
      createdAt: now,
      updatedAt: now,
    })
  }
}
