var express = require('express');
var router = express.Router();
const { SuccessModel,ErrorModel } = require('../model/resModel')
const { login } = require('../controller/login')


router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  login( username, password )
  .then(result => {
    // Object.assign(req.session, {username: result.username, realname: result.realname})
    // setRedis(req.sessionId, req.session)
    const obj = result.username ? new SuccessModel('用户登陆成功') : new ErrorModel('用户登陆失败')
    res.json(obj)
  })
});

module.exports = router;
