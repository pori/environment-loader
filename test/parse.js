import test from 'ava'
import { parse } from '../lib'

test('get an object', t => {

  let source = `A=1
    B=2
    C=3`

  let tokens = parse(source)

  t.deepEqual(tokens, {
    A: '1',
    B: '2',
    C: '3'
  })
})
