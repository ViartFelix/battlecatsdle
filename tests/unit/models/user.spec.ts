import { test } from '@japa/runner'
import type User from '#models/user'
import { UserFactory } from '#database/factories/user_factory'

test.group('User Model', () => {
  test('initials getter returns correct initials with "{username}"')
    .with([
      { username: 'John', expected: 'JO' },
      { username: 'CaSE-INseNSItIvE', expected: 'CA' },
      { username: 'MP', expected: 'MP' },
      { username: 'a', expected: 'A' },
      { username: '', expected: '' },
    ])
    .run(async ({ assert }, data) => {
      const user: User = await UserFactory.merge({
        username: data.username,
      }).make()

      assert.strictEqual(user.initials, data.expected)
    })
})
