export let isInteger = x => Number.isInteger(x)

let isDate_ = x =>
  ['getHours', 'getMinutes', 'getSeconds']
  .every(k => k in x)

export let isDate = x => {
  try { return isDate_(x) }
  catch (_) { return false }
}

