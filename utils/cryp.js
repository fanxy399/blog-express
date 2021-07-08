const cryp = require('crypto')

// 密钥
const SECRET_KEY = 'your_key'

// md5加密
const md5 = (content) => {
  let md5 = cryp.createHash('md5')
  return md5.update(content).digest('hex')
}

const genPasswrod = (password) => {
  return md5(`password=${password}&key=${SECRET_KEY}`)
}

module.exports = {
  genPasswrod
}
