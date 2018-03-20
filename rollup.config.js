import pkg from './package.json'

export default [
  { input: 'src/main.js',
    output: [
      {file: pkg.browser, format: 'umd', name: 'gethhmmss'},
      {file: pkg.main, format: 'cjs'},
      {file: pkg.module, format: 'es'}]}
]
