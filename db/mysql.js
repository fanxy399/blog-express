const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始链接
con.connect()

const exec = (sql) => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      if(err){
        reject(err)
        return
      }
      resolve(res)
    })
  })
}

module.exports = {
  exec,
  escape: mysql.escape
}