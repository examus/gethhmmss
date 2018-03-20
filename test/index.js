import test from 'ava'

import gethhmmss from '../index'

test('Only number and Date is allowed', t => {
  /* Valid inputs. */
  t.notThrows(_ => gethhmmss(new Date()))
  t.notThrows(_ => gethhmmss(60))

  /* Invalid inputs. */
  t.throws(_ => gethhmmss(null))
  t.throws(_ => gethhmmss(void null))
  t.throws(_ => gethhmmss('0'))
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
})

test('Get hh:mm:ss from Date', t => {
  let date = new Date(2007, 8, 3, 4, 20, 01)
  let hhmmss = gethhmmss(date)

  t.is(hhmmss, '04:20:02')
})

test('Get hh:mm:ss of now', t => {
  let now = new Date()

  t.is(gethhmmss(), gethhmmss(now))
})
