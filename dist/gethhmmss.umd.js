(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.gethhmmss = factory());
}(this, (function () { 'use strict';

  let isInteger = x => Number.isInteger(x);

  let isDate_ = x =>
    ['getHours', 'getMinutes', 'getSeconds']
    .every(k => k in x);

  let isDate = x => {
    try { return isDate_(x) }
    catch (_) { return false }
  };

  /**
   * Hours, minutes, seconds -> hh:mm:ss
   * Pad them with a zero, and join with ':'.
   */
  let fromArray = ([hours, minutes, seconds]) => {

    /* Expect only positive numbers. */

    let allPositive =
      [hours, minutes, seconds]
      .every(x => x >= 0);

    let allIntegers =
      [hours, minutes, seconds]
      .every(isInteger);

    console.assert(
      allPositive && allIntegers,
      'gethhmmss: fromArray: expected non-negative integers but got',
      `[${[hours, minutes, seconds].join(', ')}]`);

    /* Do the job. */

    return [hours, minutes, seconds]
    .map(String)
    .map(x => x.padStart(2, '0'))
    .join(':')
  };


  /**
   * The very logic.
   */

  let fromSeconds = givenSeconds => {
    let positiveSeconds =
      givenSeconds < 0
        ? givenSeconds * -1
        : givenSeconds;

    let [hours, minutes, seconds] = [
      positiveSeconds / 3600,
      positiveSeconds % 3600 / 60,
      positiveSeconds % 60]
    .map(x => Math.trunc(x));

    let sign = givenSeconds < 0 ? '-' : '';
    let hhmmss = fromArray([hours, minutes, seconds]);

    return ''.concat(sign, hhmmss)
  };

  let fromDate = date => {
    let [hours, minutes, seconds] =
      [date.getHours(), date.getMinutes(), date.getSeconds()];

    let hhmmss =
      fromArray([hours, minutes, seconds]);

    return hhmmss
  };

  let fromNow = () => {
    let now = new Date();
    return fromDate(now)
  };


  /**
   * Validate the args and apply the right logic.
   */
  function gethhmmss (...args) {

    /**
     * Prepare error messages.
     */

    let toomanyargs = args =>
      `gethhmmss: zero or one argument expected but got [${args.join(', ')}]`;

    let badarg = arg =>
      `gethhmmss: expected integer or Date but got ${arg}`;


    /**
     * Route to the right logic.
     */

    let [x] = args;

    if (args.length === 0) return fromNow()
    else if (args.length > 1) throw TypeError(toomanyargs(args))
    else if (isInteger(x)) return fromSeconds(x)
    else if (isDate(x)) return fromDate(x)
    else throw TypeError(badarg(x))
  }

  return gethhmmss;

})));
