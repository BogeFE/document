const myPlugin = require('./plugin')
const babel = require('@babel/core')

const content = 'const name = boge'

const { code } = babel.transform(content, {
    plugins: [myPlugin]
})

console.log(code)