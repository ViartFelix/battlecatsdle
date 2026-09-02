import { type HttpContext } from '@adonisjs/core/http'
import DailyUnit from '#models/daily_unit'
import { DateTime } from 'luxon'
import Unit from '#models/unit'

export default class GameController {
  async display(context: HttpContext) {
    const today: DateTime = DateTime.utc().startOf('day')

    // get the daily unit of today
    const daily: DailyUnit | null = await DailyUnit.findBy({
      day: today,
    })

    if (null === daily) {
      return context.view.render('pages/game/no_daily_unit')
    }

    const unit: Unit = await Unit.findOrFail(daily.unitId)

    return context.view.render('pages/game/game', {
      unit: unit,
      day: today,
    })
  }
}
