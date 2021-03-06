const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    'dist/tmp/runtime.js',
    'dist/tmp/polyfills.js',
    'dist/tmp/main.js'
  ]
  await fs.ensureDir('dist/hra-tissue-blocks')
  await concat(files, 'dist/hra-tissue-blocks/wc.js');
  await fs.copyFile('dist/tmp/styles.css', 'dist/hra-tissue-blocks/wc.css')
  await fs.rmdir('dist/tmp', { recursive: true })
})()