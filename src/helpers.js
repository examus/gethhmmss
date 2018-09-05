export let isInteger = x => Number.isInteger(x)

let isDate_ = x =>
  ['getHours', 'getMinutes', 'getSeconds']
  .every(k => k in x)

export let isDate = x => {
  try { return isDate_(x) }
  catch (_) { return false }
}

/**
 * Hours, minutes, seconds -> hh:mm:ss
 * Pad them with a zero, and join with ':'.
 */
export let fromArray = ([hours, minutes, seconds]) => {

  /* Expect only positive numbers. */

  let allPositive =
    [hours, minutes, seconds]
    .every(x => x >= 0)

  let allIntegers =
    [hours, minutes, seconds]
    .every(isInteger)

  console.assert(
    allPositive && allIntegers,
    'gethhmmss: fromArray: expected non-negative integers but got',
    `[${[hours, minutes, seconds].join(', ')}]`)

  /* Do the job. */

  return [hours, minutes, seconds]
  .map(String)
  .map(x => x.padStart(2, '0'))
  .join(':')
}

/**
 * Convert back to an array.
 */
export let toArray = x =>
  x.split(':')
  .map(Number)

/**
 * The very logic.
 */

export let fromSeconds = givenSeconds => {
  let positiveSeconds =
    givenSeconds < 0
      ? givenSeconds * -1
      : givenSeconds

  let [hours, minutes, seconds] = [
    positiveSeconds / 3600,
    positiveSeconds % 3600 / 60,
    positiveSeconds % 60]
  .map(x => Math.trunc(x))

  let sign = givenSeconds < 0 ? '-' : ''
  let hhmmss = fromArray([hours, minutes, seconds])

  return ''.concat(sign, hhmmss)
}

export let fromDate = date => {
  let [hours, minutes, seconds] =
    [date.getHours(), date.getMinutes(), date.getSeconds()]

  let hhmmss =
    fromArray([hours, minutes, seconds])

  return hhmmss
}

export let fromNow = () => {
  let now = new Date()
  return fromDate(now)
}
