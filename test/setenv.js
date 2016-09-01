import test from 'ava'
import { setenv } from '../lib'

test('set environment variables', t => {
  setenv({
    A: 1,
    B: 2,
    C: 3
  })

  t.is(process.env.A, '1')
  t.is(process.env.B, '2')
  t.is(process.env.C, '3')
})
