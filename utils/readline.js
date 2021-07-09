const readline = require('readline')
const fs = require('fs')
const path = require('path')

// 文件名
const accessFile = path.join(__dirname ,'../', 'logs', 'access.log')

// 创建 read stream
const accessStream = fs.createReadStream(accessFile)

// 创建 readline 对象
const accessReadLine = readline.createInterface({
  input: accessStream
})

let chromeNum = 0
let sum = 0

accessReadLine.on('line', lineData => {
  if(!lineData) return
  sum += 1
  const arr = lineData.split(' -- ')
  if (arr[3] && arr[3].indexOf('Chrome') > 0) {
    // 累加 chrome 的数量
    chromeNum++
  }
})

accessReadLine.on('close', () => {
  console.log('chrome 占比：' + chromeNum / sum)
})