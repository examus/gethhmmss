let isInteger = x => Number.isInteger(x)

let isDate = x =>
  ['getHours', 'getMinutes', 'getSeconds']
  .every(k => k in x)

export default function gethhmmss (x) {
  /* Validate the arg. */
  if (!isInteger(x) || !isDate(x)) {
    throw (TypeError(`gethhmmss: expected integer or Date but got ${x}`))
  }
}
