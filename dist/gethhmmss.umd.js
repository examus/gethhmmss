(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.gethhmmss = {})));
}(this, (function (exports) { 'use strict';

  let isInteger = x => Number.isInteger(x);

  let isDate_ = x =>
    ['getHours', 'getMinutes', 'getSeconds']
    .every(k => k in x);

  let isDate = x => {
    try { return isDate_(x) }
    catch (_) { return false }
  };

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
      'gethhmmss: fromArray: expected positive integers but got',
      `[${[hours, minutes, seconds].join(', ')}]`);

    /* Do the job. */

    return [hours, minutes, seconds]
    .map(String)
    .map(x => x.padStart(2, '0'))
    .join(':')
  };

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

  function gethhmmss (...args) {

    /**
     * Validate the args.
     */

    if (args.length > 1) {
      throw TypeError(`gethhmmss: zero or one argument expected but got [${args.join(', ')}]`)
    }

    let [x] = args;

    if (args.length === 1 && !isInteger(x) && !isDate(x)) {
      throw TypeError(`gethhmmss: expected integer or Date but got ${x}`)
    }


    /**
     * Do the job.
     */

    if (args.length === 0) return fromNow()
    else if (isInteger(x)) return fromSeconds(x)
    else if (isDate(x)) return fromDate(x)
  }

  exports.isInteger = isInteger;
  exports.isDate = isDate;
  exports.default = gethhmmss;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
