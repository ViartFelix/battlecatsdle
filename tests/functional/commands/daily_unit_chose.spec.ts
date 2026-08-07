import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Daily unit chose - Command', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())


})
