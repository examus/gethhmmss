import test from 'ava'

import {isInteger, isDate} from '../src/helpers'

/* isInteger and isDate */

test('isInteger', t => {
  t.true(isInteger(0))
  t.true(isInteger(1))
  t.false(isInteger(1.1))
  t.false(isInteger(NaN))
  t.false(isInteger(null))
  t.false(isInteger(''))
  t.false(isInteger('0'))
})

let FakeDate = () => {
  let noop = _ => void null

  let [getHours, getMinutes, getSeconds] =
    [noop, noop, noop]

  return {
    getHours,
    getMinutes,
    getSeconds}
}

test('isDate', t => {
  t.true(isDate(new Date()))
  t.true(isDate(FakeDate()))
  t.false(isDate(5))
  t.false(isDate('5'))
  t.false(isDate(null))
})
