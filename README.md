# gethhmmss
Convert seconds or Data object to "hh:mm:ss" format.

## Usage

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
