import pkg from './package.json'

let mainItem = ({input, name}) => ({
  input,
  output: [
    {file: pkg.browser, format: 'umd', name},
    {file: pkg.main, format: 'cjs'},
    {file: pkg.module, format: 'es'}]
})

let configItem = ({input, name}) => ({
  input,
  output: [
    {file: `dist/${name}.umd.js`, format: 'umd', name},
    {file: `dist/${name}.cjs.js`, format: 'cjs'},
    {file: `dist/${name}.esm.js`, format: 'es'}]
})

export default [
  mainItem({input: 'src/main.js', name: 'gethhmmss'}),
  configItem({input: 'src/toHHMMSS.js', name: 'toHHMMSS'}),
  configItem({input: 'src/toMMSS.js', name: 'toMMSS'}),
]
