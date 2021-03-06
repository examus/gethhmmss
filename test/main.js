import test from 'ava'

import gethhmmss from '../src/main'
import toMMSS from '../src/toMMSS'
import toHHMMSS from '../src/toHHMMSS'

test('toHHMMSS is just an alias for gethhmmss', t => {
  t.is(gethhmmss, toHHMMSS)
})

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

test('Get mm:ss from seconds', t => {
  t.is(toMMSS(0), '00:00')
  t.is(toMMSS(59), '00:59')
  t.is(toMMSS(60), '01:00')
  t.is(toMMSS(3600), '60:00')
  t.is(toMMSS(3601), '60:01')
})
