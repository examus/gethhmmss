import test from 'ava'

import {
  default as gethhmmss,
  isInteger,
  isDate
} from '../index'

test('Only number and Date is allowed', t => {
  /* Number of arguments. */
  t.notThrows(_ => gethhmmss())
  t.notThrows(_ => gethhmmss(1))
  t.throws(_ => gethhmmss(1, 2))
  t.throws(_ => gethhmmss(1, 2, 3))

  /* Valid inputs. */
  t.notThrows(_ => gethhmmss(new Date()))
  t.notThrows(_ => gethhmmss(60))

  /* Invalid inputs. */
  t.throws(_ => gethhmmss(null))
  t.throws(_ => gethhmmss(void null))
  t.throws(_ => gethhmmss('0'))
  t.throws(_ => gethhmmss('1.2'))
  t.throws(_ => gethhmmss([0]))
  t.throws(_ => gethhmmss({seconds: 0}))
})

test('Get hh:mm:ss from seconds', t => {
  /* From the readme. */
  t.is(gethhmmss(71), '00:01:11')
  t.is(gethhmmss(86400), '24:00:00')
  t.is(gethhmmss(90080), '25:01:20')

  /* Some tricky cases. */
  t.is(gethhmmss(0), '00:00:00')
  t.is(gethhmmss(-1), '-00:00:01')
  t.is(gethhmmss(-77), '-00:01:17')
  t.is(gethhmmss(-7777), '-02:09:37')
})

test('Get hh:mm:ss from Date', t => {
  let date = new Date(2007, 8, 3, 4, 20, 2)
  let hhmmss = gethhmmss(date)

  t.is(hhmmss, '04:20:02')
})

test('Get hh:mm:ss of now', t => {
  let now = new Date()

  t.is(gethhmmss(), gethhmmss(now))
})

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
