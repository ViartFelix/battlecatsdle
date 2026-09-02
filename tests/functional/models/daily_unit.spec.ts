import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { DailyUnitFactory } from '#database/factories/daily_unit_factory'
import { UnitFactory } from '#database/factories/unit_factory'
import type DailyUnit from '#models/daily_unit'
import type Unit from '#models/unit'

test.group('Daily unit - Unit relation', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('associate() links a unit to a daily unit', async ({ assert }) => {
    const dailyUnit: DailyUnit = await DailyUnitFactory.make()
    const unit: Unit = await UnitFactory.create()

    await dailyUnit.related('unit').associate(unit)
    await dailyUnit.save()
    await dailyUnit.load('unit')

    assert.equal(dailyUnit.unitId, unit.id)
    assert.equal(dailyUnit.unit.id, unit.id)
  })

  test('load() resolves the related unit', async ({ assert }) => {
    const unit: Unit = await UnitFactory.create()
    const dailyUnit: DailyUnit = await DailyUnitFactory.make()
    await dailyUnit.related('unit').associate(unit)
    await dailyUnit.save()

    await dailyUnit.load('unit')

    assert.instanceOf(dailyUnit.unit, Object)
    assert.equal(dailyUnit.unit.id, unit.id)
    assert.equal(dailyUnit.unit.name, unit.name)
  })

  test('associating a different unit on one daily unit does not affect another', async ({
    assert,
  }) => {
    const [dailyUnitA, dailyUnitB]: DailyUnit[] = await DailyUnitFactory.makeMany(2)
    const [unitA, unitB]: Unit[] = await UnitFactory.createMany(2)

    await dailyUnitA.related('unit').associate(unitA)
    await dailyUnitA.save()
    await dailyUnitB.related('unit').associate(unitB)
    await dailyUnitB.save()
    await dailyUnitB.load('unit')

    assert.notEqual(dailyUnitB.unit.id, unitA.id)
    assert.equal(dailyUnitB.unit.id, unitB.id)
  })

  test('one unit can have multiple daily entries', async ({ assert }) => {
    const unit: Unit = await UnitFactory.create()
    const [dailyA, dailyB, dailyC] = await DailyUnitFactory.makeMany(3)

    await dailyA.related('unit').associate(unit)
    await dailyA.save()
    await dailyA.load('unit')
    await dailyB.related('unit').associate(unit)
    await dailyB.save()
    await dailyB.load('unit')
    await dailyC.related('unit').associate(unit)
    await dailyC.save()
    await dailyC.load('unit')

    assert.equal(dailyA.unit.id, unit.id)
    assert.equal(dailyB.unit.id, unit.id)
    assert.equal(dailyC.unit.id, unit.id)
  })

  test('one unit can access its daily entries', async ({ assert }) => {
    const unit: Unit = await UnitFactory.create()
    const [dailyA, dailyB, dailyC] = await DailyUnitFactory.makeMany(3)

    await dailyA.related('unit').associate(unit)
    await dailyA.save()
    await dailyA.load('unit')
    await dailyB.related('unit').associate(unit)
    await dailyB.save()
    await dailyB.load('unit')
    await dailyC.related('unit').associate(unit)
    await dailyC.save()
    await dailyC.load('unit')

    await unit.load('dailyUnits')

    assert.deepEqual(
      unit.dailyUnits.map((d: DailyUnit) => d.id),
      [dailyA.id, dailyB.id, dailyC.id]
    )
  })
})
