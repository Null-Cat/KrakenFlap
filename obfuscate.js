const obfuscator = require('javascript-obfuscator')
const fs = require('fs')

console.log('Obfuscating...')
console.log('This may take a while...')

function obfuscate(file, output) {
  const code = fs.readFileSync(file, 'utf8')
  const obfuscated = obfuscator.obfuscate(code, {
    compact: true,
    simplify: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    selfDefending: true,
    splitStrings: true,
    renameGlobals: true
  })
  fs.writeFileSync(output, obfuscated.getObfuscatedCode())
}

obfuscate('./public/js/krakenflap.js', './obfuscated/krakenflap.js')
console.log('Obfuscated krakenflap.js to ./obfuscated/krakenflap.js')
