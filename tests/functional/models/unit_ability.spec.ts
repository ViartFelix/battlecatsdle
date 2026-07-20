import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UnitFactory } from '#database/factories/unit_factory'
import { AbilityFactory } from '#database/factories/ability_factory'
import type Unit from '#models/unit'
import type Ability from '#models/ability'

test.group('Unit - Ability relation', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('attach() links an ability to a unit via the pivot table', async ({ assert }) => {
    const unit: Unit = await UnitFactory.create()
    const ability: Ability = await AbilityFactory.create()

    await unit.related('abilities').attach([ability.id])
    await unit.load('abilities')

    assert.lengthOf(unit.abilities, 1)
    assert.equal(unit.abilities[0].id, ability.id)
  })

  test('detach() removes the pivot row without deleting the ability', async ({ assert }) => {
    const unit: Unit = await UnitFactory.create()
    const ability: Ability = await AbilityFactory.create()
    await unit.related('abilities').attach([ability.id])

    await unit.related('abilities').detach([ability.id])
    await unit.load('abilities')

    assert.lengthOf(unit.abilities, 0)

    await ability.refresh()
    assert.isFalse(ability.$isDeleted)
  })

  test("attach() on one unit does not affect another unit's abilities", async ({ assert }) => {
    const [unitA, unitB]: Unit[] = await UnitFactory.createMany(2)
    const ability: Ability = await AbilityFactory.create()

    await unitA.related('abilities').attach([ability.id])
    await unitB.load('abilities')

    assert.lengthOf(unitB.abilities, 0)
  })
})
