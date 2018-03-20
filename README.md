# gethhmmss
Convert seconds or Data object to "hh:mm:ss" format.

## Usage

Convert number of seconds to "hh:mm:ss".
The number of seconds is an interval, not a date. It can be greater than 23:59:59.
```js
  import gethhmmss from 'gethhmmss'
  
  console.log(gethhmmss(71))    /* 00:01:11 */
  console.log(gethhmmss(86400)) /* 24:00:00 */
  console.log(gethhmmss(90080)) /* 25:01:20 */
```

Convert given Date object to "hh:mm:ss"
```js
  import gethhmmss from 'gethhmmss'

  /* Sep 03 2007 04:20:02 */
  let date = new Date(2007, 8, 3, 4, 20, 01)
  
  let hhmmss = gethhmmss(date)
  
  console.log(hhmmss) /* 04:20:02 */
```

Get current date in "hh:mm:ss" format
```js
  import gethhmmss from 'gethhmmss'
  
  let hhmmss = gethhmmss()
```

## See Also

> Convert seconds to HH:MM:SS, that's it.
https://www.npmjs.com/package/tohhmmss
