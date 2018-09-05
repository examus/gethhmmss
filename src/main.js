import {isInteger, isDate, fromSeconds, fromDate, fromNow} from './helpers'

/**
 * Validate the args and apply the right logic.
 */
export default function gethhmmss (...args) {

  /**
   * Prepare error messages.
   */

  let toomanyargs = args =>
    `gethhmmss: zero or one argument expected but got [${args.join(', ')}]`

  let badarg = arg =>
    `gethhmmss: expected integer (number of seconds) or Date but got ${arg}`


  /**
   * Route to the right logic.
   */

  let [x] = args

  if (args.length === 0) return fromNow()
  else if (args.length > 1) throw TypeError(toomanyargs(args))
  else if (isInteger(x)) return fromSeconds(x)
  else if (isDate(x)) return fromDate(x)
  else throw TypeError(badarg(x))
}
