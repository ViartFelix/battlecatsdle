import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { type DateObjectUnits, DateTime, Settings } from 'luxon'
import ace from '@adonisjs/core/services/ace'
import DailyUnitChose from '../../../commands/daily_unit_chose.js'
import DailyUnit from '#models/daily_unit'
import { UnitFactory } from '#database/factories/unit_factory'
import type Unit from '#models/unit'
import { DailyUnitFactory } from '#database/factories/daily_unit_factory'

/**
 * Wrapper for the command. Returns the command instance (exitCode, error, result)
 * since `ace.exec()` never throws: command failures are captured on the instance.
 */
const execCommand = async (flags: string[] = []) => {
  return ace.exec(DailyUnitChose.commandName, flags)
}

/**
 * Alias for:
 * ```js
 * DateTime.fromObject(obj, { zone: 'utc' })
 * ```
 */
const fromObjUtc = (obj: DateObjectUnits): DateTime => {
  return DateTime.fromObject(obj, { zone: 'utc' })
}

/**
 * Returns the row count currently in the db for DailyUnit
 */
const getRowCount = async (): Promise<number> => {
  const rows = await DailyUnit.query().count('* as total')

  if (rows.length === 0) return 0
  else return Number(rows[0].$extras.total)
}

test.group('Daily unit chose - Command', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())
  group.each.setup(() => {
    Settings.now = () => Date.UTC(2000, 4, 10)
    Settings.defaultZone = 'utc'

    return () => {
      Settings.now = () => Date.now()
      Settings.defaultZone = 'system'
    }
  })

  test('inserts an entry when no other entries are present and when no flags are set', async ({
    assert,
  }) => {
    const unit: Unit = await UnitFactory.create()
    await execCommand()

    const entry: DailyUnit = await DailyUnit.findByOrFail({
      day: fromObjUtc({ year: 2000, month: 5, day: 10 }),
    })

    assert.equal(entry.unitId, unit.id)
  })

  test('updates the already existing entry if an entry already exists for the day', async ({
    assert,
  }) => {
    const [unitA, unitB] = await UnitFactory.createMany(2)

    const entry: DailyUnit = await DailyUnitFactory.merge({
      unitId: unitA.id,
      day: fromObjUtc({ year: 2000, month: 5, day: 10 }),
      overridable: true,
    }).create()

    await execCommand([`--unit=${unitB.id}`])

    const afterCount: number = await getRowCount()
    const newEntry: DailyUnit = await DailyUnit.findByOrFail({
      day: fromObjUtc({ year: 2000, month: 5, day: 10 }),
    })

    assert.equal(1, afterCount)
    assert.equal(entry.id, newEntry.id)
    assert.equal(newEntry.unitId, unitB.id)
  })

  test('does not update the already existing entry if it is not overridable', async ({
    assert,
  }) => {
    const [unitA, unitB] = await UnitFactory.createMany(2)

    const entry: DailyUnit = await DailyUnitFactory.merge({
      unitId: unitA.id,
      day: fromObjUtc({ year: 2000, month: 5, day: 10 }),
      overridable: false,
    }).create()

    await execCommand([`--unit=${unitB.id}`])

    const afterCount: number = await getRowCount()
    const untouchedEntry: DailyUnit = await DailyUnit.findByOrFail({
      day: fromObjUtc({ year: 2000, month: 5, day: 10 }),
    })

    assert.equal(1, afterCount)
    assert.equal(entry.id, untouchedEntry.id)
    assert.equal(untouchedEntry.unitId, unitA.id)
  })

  test('sets overridable to true on the inserted entry by default', async ({ assert }) => {
    await UnitFactory.create()

    await execCommand()

    const entry: DailyUnit = await DailyUnit.findByOrFail({
      day: fromObjUtc({ year: 2000, month: 5, day: 10 }),
    })

    assert.isTrue(entry.overridable)
  })

  test('sets overridable to false on the inserted entry when --no-overridable is passed', async ({
    assert,
  }) => {
    await UnitFactory.create()

    await execCommand(['--overridable=false'])

    const entry: DailyUnit = await DailyUnit.findByOrFail({
      day: fromObjUtc({ year: 2000, month: 5, day: 10 }),
    })

    assert.isFalse(entry.overridable)
  })

  test('does nothing if the daily unit is not overridable', async ({ assert }) => {
    const [unitA, unitB] = await UnitFactory.createMany(2)

    const previousEntry: DailyUnit = await DailyUnitFactory.merge({
      unitId: unitA.id,
      day: fromObjUtc({ year: 2000, month: 5, day: 10 }),
      overridable: false,
    }).create()

    await execCommand(['--day=2000-05-10', `--unit=${unitB.id}`])

    const afterCount = await getRowCount()

    const afterEntry: DailyUnit = await DailyUnit.findByOrFail({
      day: fromObjUtc({ year: 2000, month: 5, day: 10 }),
    })

    if (null === previousEntry.updatedAt) {
      assert.fail('The updated at of the previous entry is null')
    }

    assert.equal(afterEntry.unitId, previousEntry.unitId)
    assert.equal(unitA.id, previousEntry.unitId)
    assert.isFalse(afterEntry.overridable)

    // no update
    assert.equal(
      (previousEntry.updatedAt as DateTime).toSeconds(),
      (afterEntry.updatedAt as DateTime).toSeconds()
    )
    // no insert
    assert.equal(afterCount, 1)
  })

  test('defaults to today if no date have been set in the args', async ({ assert }) => {
    const unit: Unit = await UnitFactory.create()

    await execCommand()

    const entry: DailyUnit = await DailyUnit.findByOrFail({
      day: fromObjUtc({ year: 2000, month: 5, day: 10 }),
    })

    const entryUtc = entry.day.toUTC()

    assert.equal(unit.id, entry.unitId)
    assert.equal(entryUtc.toISODate(), fromObjUtc({ year: 2000, month: 5, day: 10 }).toISODate())
    assert.equal(await getRowCount(), 1)
  })

  test('sets the date to the specified date if a date have been set in the args', async ({
    assert,
  }) => {
    const unit: Unit = await UnitFactory.create()

    await execCommand(['--day="2018-08-16"'])

    const entry: DailyUnit = await DailyUnit.findByOrFail({
      day: fromObjUtc({ year: 2018, month: 8, day: 16 }),
    })

    const entryUtc = entry.day.toUTC()

    assert.equal(unit.id, entry.unitId)
    assert.equal(entryUtc.toISODate(), fromObjUtc({ year: 2018, month: 8, day: 16 }).toISODate())
  })

  test('ignores units used within the cooldown window when choosing a candidate', async ({
    assert,
  }) => {
    const [ignoredUnit, availableUnit] = await UnitFactory.createMany(2)

    await DailyUnitFactory.merge({
      unitId: ignoredUnit.id,
      day: fromObjUtc({ year: 2000, month: 5, day: 9 }),
    }).create()

    await execCommand(['--cooldown=1'])

    const entry: DailyUnit = await DailyUnit.findByOrFail({
      day: fromObjUtc({ year: 2000, month: 5, day: 10 }),
    })

    assert.equal(entry.unitId, availableUnit.id)
  })

  test('allows a previously used unit to be chosen again when the cooldown is set to 0', async ({
    assert,
  }) => {
    const unit: Unit = await UnitFactory.create()

    await DailyUnitFactory.merge({
      unitId: unit.id,
      day: fromObjUtc({ year: 2000, month: 5, day: 9 }),
    }).create()

    await execCommand(['--cooldown=0'])

    const entry: DailyUnit = await DailyUnit.findByOrFail({
      day: fromObjUtc({ year: 2000, month: 5, day: 10 }),
    })

    assert.equal(entry.unitId, unit.id)
  })

  test('allows a unit to be re-chosen once it falls outside the cooldown window', async ({
    assert,
  }) => {
    const [expiredUnit, recentUnit] = await UnitFactory.createMany(2)

    await DailyUnitFactory.merge({
      unitId: expiredUnit.id,
      day: fromObjUtc({ year: 2000, month: 5, day: 8 }),
    }).create()

    await DailyUnitFactory.merge({
      unitId: recentUnit.id,
      day: fromObjUtc({ year: 2000, month: 5, day: 9 }),
    }).create()

    await execCommand(['--cooldown=1'])

    const entry: DailyUnit = await DailyUnit.findByOrFail({
      day: fromObjUtc({ year: 2000, month: 5, day: 10 }),
    })

    assert.equal(entry.unitId, expiredUnit.id)
  })

  test('no entries are created when the date ({date}) is not the expected format ({desc})')
    .with([
      { date: '20015-08-08', desc: '5-digit year' },
      { date: '-09-01', desc: 'missing year' },
      { date: '2000-00-01', desc: 'wrong month' },
      { date: '2000--01', desc: 'missing month' },
      { date: '2000-01-69', desc: 'wrong day' },
      { date: '2000-08-', desc: 'missing day' },
    ])
    .run(async ({ assert }, data) => {
      const command = await execCommand([`--day="${data.date}"`])

      assert.equal(
        command.exitCode,
        1,
        `The command with the date "${data.date}" should have failed (${data.desc}).`
      )
      assert.include(command.error?.message, 'Date format is not valid')
      assert.equal(await getRowCount(), 0)
    })
})
