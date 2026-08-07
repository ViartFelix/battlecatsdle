import { BaseCommand, flags } from '@adonisjs/core/ace'
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

  @flags.number({
    alias: 'u',
    description: 'The unit ID to set in the daily (bypasses the ignored candidates).',
  })
  declare unit?: number

  @flags.number({
    alias: 'c',
    description: 'Number of past days for which a unit cannot be picked again once played.',
    default: schedulerConfig.daily_unit_chose.ignore_last_x_units as number,
  })
  declare cooldown: number

  @flags.string({
    alias: 'd',
    description: 'The targeted day. Defaults to today if not set. Expected format: YYYY-MM-DD',
  })
  declare day?: string

  async run() {
    const today: DateTime = this.getTargetDate()

    this.logger.info(`Starting daily unit command for '${today.toFormat('ccc dd/LL/yyyy')}'...`)

    const chosenUnit: Unit = await this.getChosenUnit()

    this.logger.info(`Chosen unit: ${chosenUnit.name} (ID: ${chosenUnit.id}). Creating entry...`)

    await this.insertOrUpdateEntry(chosenUnit, today)

    this.logger.success(
      `Successfully set unit '${chosenUnit.name}' (#${chosenUnit.id}) to the daily unit for the ${today.toFormat('ccc dd/LL/yyyy')}.`
    )

    await this.terminate()
  }

  /**
   * Inserts or updates the existing entry. (To prevent unique() constraint from triggering in the DB).
   * @private
   */
  private async insertOrUpdateEntry(unit: Unit, day: DateTime): Promise<void> {
    const matchingEntry: DailyUnit | null = await DailyUnit.findBy({ day })

    if (null === matchingEntry) {
      await this.insertChosen(unit.id, day)
    } else {
      this.logger.info(`The entry #${matchingEntry.id} already exists. Updating it...`)
      matchingEntry.updatedAt = DateTime.now().toUTC()
      await matchingEntry.related('unit').associate(unit)
      await matchingEntry.save()
    }
  }

  /**
   * Returns the date for the daily unit. Returns today of no days have been chosen.
   * @private
   */
  private getTargetDate(): DateTime {
    if (!this.day) {
      return DateTime.now().toUTC()
    }

    const result: DateTime = DateTime.fromFormat(this.day, 'yyyy-M-d', { zone: 'utc' })

    if (!result.isValid) {
      throw new Error(
        `Date format is not valid (${result.invalidExplanation}). Please ensure the date is in format YYYY-MM-DD`
      )
    }

    return result
  }

  /**
   * Returns the chosen unit for the command.
   * @private
   */
  private async getChosenUnit(): Promise<Unit> {
    if (undefined !== this.unit) {
      return await Unit.findOrFail(this.unit as number)
    }

    const entriesToIgnore: Unit[] = await this.getLastEntriesToIgnore(this.cooldown)
    const possibleCandidates: Unit[] = await this.getDailyCandidates(entriesToIgnore)

    this.logger.info(
      `Ignored ${entriesToIgnore.length} units. Possible candidates: ${possibleCandidates.length}.`
    )

    const chosenId: number =
      possibleCandidates[Math.floor(Math.random() * possibleCandidates.length)].id

    return await Unit.findOrFail(chosenId)
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
