import { type HttpContext } from '@adonisjs/core/http'
import DailyUnit from '#models/daily_unit'
import { DateTime } from 'luxon'
import Unit from '#models/unit'
import { Debugbar } from 'adonis-debugbar'

export default class GameController {
  async display(context: HttpContext) {
    const today: DateTime = DateTime.utc().startOf('day')

    const daily: DailyUnit | null = await DailyUnit.findBy({
      day: today,
    })

    if (null === daily) {
      Debugbar.warn('No daily unit for today.')
      return context.view.render('pages/game/no_daily_unit')
    }

    const unit: Unit = await Unit.findOrFail(daily.unitId)
    const allUnits: Unit[] = await Unit.all()

    Debugbar.log(`The unit to guess is the following: '${unit.name}' (#${unit.id})`)

    return context.view.render('pages/game/game', {
      unit: unit,
      day: today,
      all_units: allUnits,
    })
  }
}
