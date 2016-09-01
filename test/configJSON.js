import test from 'ava'
import { configJSON } from '../lib'

test('load environment from a JSON file', async t => {
  await configJSON('env1.json', null)

  t.is(process.env.A, '1')
  t.is(process.env.B, '2')
  t.is(process.env.C, '3') 
})

test('load environment from a JSON file with a key', async t => {
  await configJSON('env2.json', 'example')

  t.is(process.env.A, '1')
  t.is(process.env.B, '2')
  t.is(process.env.C, '3')
})
