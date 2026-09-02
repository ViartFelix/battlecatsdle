import factory from '@adonisjs/lucid/factories'
import DailyUnit from '#models/daily_unit'
import { DateTime } from 'luxon'
import { UnitFactory } from '#database/factories/unit_factory'

// unique days
let nextDay = DateTime.now().startOf('day')

export const DailyUnitFactory = factory
  .define(DailyUnit, async ({ faker }) => {
    nextDay = nextDay.minus({ days: 1 })

    return {
      day: nextDay,
      createdAt: nextDay,
      updatedAt: nextDay,
      overridable: faker.datatype.boolean({ probability: 0.75 }),
    }
  })
  .relation('unit', () => UnitFactory)
  .build()
