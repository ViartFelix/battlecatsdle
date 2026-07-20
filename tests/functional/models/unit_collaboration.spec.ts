import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UnitFactory } from '#database/factories/unit_factory'
import { CollaborationFactory } from '#database/factories/collaboration_factory'
import type Unit from '#models/unit'
import type Collaboration from '#models/collaboration'

test.group('Unit - Collaboration relation', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('attach() links a collaboration to a unit via the pivot table', async ({ assert }) => {
    const unit: Unit = await UnitFactory.create()
    const collaboration: Collaboration = await CollaborationFactory.create()

    await unit.related('collaborations').attach([collaboration.id])
    await unit.load('collaborations')

    assert.lengthOf(unit.collaborations, 1)
    assert.equal(unit.collaborations[0].id, collaboration.id)
  })

  test('detach() removes the pivot row without deleting the collaboration', async ({ assert }) => {
    const unit: Unit = await UnitFactory.create()
    const collaboration: Collaboration = await CollaborationFactory.create()
    await unit.related('collaborations').attach([collaboration.id])

    await unit.related('collaborations').detach([collaboration.id])
    await unit.load('collaborations')

    assert.lengthOf(unit.collaborations, 0)

    await collaboration.refresh()
    assert.isFalse(collaboration.$isDeleted)
  })

  test("attach() on one unit does not affect another unit's collaborations", async ({ assert }) => {
    const [unitA, unitB]: Unit[] = await UnitFactory.createMany(2)
    const collaboration: Collaboration = await CollaborationFactory.create()

    await unitA.related('collaborations').attach([collaboration.id])
    await unitB.load('collaborations')

    assert.lengthOf(unitB.collaborations, 0)
  })
})
