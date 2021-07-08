
const dbConfig = {
  dev: {
    MYSQL_CONF:{
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'fan18338142404',
      database: 'myblog'
    },
    REDIS_CONF:{
      host: '127.0.0.1',
      port: 6379
    }
  },
  production: {
    MYSQL_CONF:{
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'fan18338142404',
      database: 'myblog'
    },
    REDIS_CONF:{
      host: '127.0.0.1',
      port: 6379
    }
  }
}

module.exports = dbConfig[process.env.NODE_ENV]