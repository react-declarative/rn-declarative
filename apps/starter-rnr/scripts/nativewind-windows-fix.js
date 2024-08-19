/* 
  This is used to fix a bug in Metro that prevents NativeWind from being applied on web in Windows, which crashes the compiler.
  See: https://github.com/nativewind/nativewind/pull/860
*/

const fs = require('fs')
const path = require('path')

const filePath = path.join('.', 'node_modules', 'nativewind', 'dist', 'metro', 'transformer.js')

fs.readFile(filePath, 'utf8', (err, content) => {
  if (err) {
    console.error(err)
    return
  }

  const cjsIssue = "`require('${config.nativewind.output}');`"
  const ecsIssue = "`import '${config.nativewind.output}'`"

  if (!content.includes(cjsIssue) && !content.includes(ecsIssue)) {
    return console.log('🎉 NativeWind fix already applied!')
  }

  const fix = "`require('${config.nativewind.output.replace(/\\\\/g, '\\\\\\\\')}');`"

  let updatedContent = content.replace(cjsIssue, fix)
  updatedContent = updatedContent.replace(ecsIssue, fix)

  fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
    if (err) {
      return console.error(err)
    }
    console.log('🎉 NativeWind fix applied successfully!')
  })
})
