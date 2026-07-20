import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UnitFactory } from '#database/factories/unit_factory'
import { TraitFactory } from '#database/factories/trait_factory'
import type Unit from '#models/unit'
import type Trait from '#models/trait'

test.group('Unit - Trait relation', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('attach() links a trait to a unit via the pivot table', async ({ assert }) => {
    const unit: Unit = await UnitFactory.create()
    const trait: Trait = await TraitFactory.create()

    await unit.related('traits').attach([trait.id])
    await unit.load('traits')

    assert.lengthOf(unit.traits, 1)
    assert.equal(unit.traits[0].id, trait.id)
  })

  test('detach() removes the pivot row without deleting the trait', async ({ assert }) => {
    const unit: Unit = await UnitFactory.create()
    const trait: Trait = await TraitFactory.create()
    await unit.related('traits').attach([trait.id])

    await unit.related('traits').detach([trait.id])
    await unit.load('traits')

    assert.lengthOf(unit.traits, 0)

    await trait.refresh()
    assert.isFalse(trait.$isDeleted)
  })

  test("attach() on one unit does not affect another unit's traits", async ({ assert }) => {
    const [unitA, unitB]: Unit[] = await UnitFactory.createMany(2)
    const trait: Trait = await TraitFactory.create()

    await unitA.related('traits').attach([trait.id])
    await unitB.load('traits')

    assert.lengthOf(unitB.traits, 0)
  })
})
