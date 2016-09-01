import test from 'ava'
import { config } from '../lib'

test('load environment variables', async t => {
  await config()

  t.is(process.env.FOO, 'BAR')
})

test('load environment variables for a custom file name', async t => {
  await config('.vars')

  t.is(process.env.A, '1')
})
