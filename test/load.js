import test from 'ava'
import { load } from '../lib'

test('load config with custom function', async t => {
  await load('.env', config => {
    t.is(config, 'FOO=BAR\n')

    process.env.A = 1
    process.env.B = 2
    process.env.C = 3
  })

  t.is(process.env.A, '1')
  t.is(process.env.B, '2')
  t.is(process.env.C, '3')
})
