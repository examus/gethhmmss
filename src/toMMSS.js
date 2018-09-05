/** */
import gethhmmss from './main'
import {toArray, fromArray} from './helpers'

/**
 *
 */
let toMMSS = (...args) => {
  let hhmmss = gethhmmss(...args)
  let [hours, minutes, seconds] = toArray(hhmmss)

  minutes += hours * 60

  let s = fromArray([0, minutes, seconds])
  return s.substring(s.indexOf(':') + 1)
}

export default toMMSS
