import { configApp } from '@adonisjs/eslint-config'

export default configApp({
  ignores: ['.adonisjs', 'tmp', 'database/schema.ts', 'database/schema_rules.ts'],
})
