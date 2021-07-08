const { exec, escape } = require("../db/mysql")

const {genPasswrod} = require('../utils/cryp')

const login = (username, password) => {
  const md5Psd = genPasswrod(password)
  const sql = `select username, realname from users where username=${escape(username)} and password=${escape(md5Psd)}`
  return exec(sql).then(res => (res[0] || {}) )
}

module.exports = {
  login
}