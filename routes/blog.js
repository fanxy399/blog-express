var express = require('express');
var router = express.Router();
const { SuccessModel,ErrorModel } = require('../model/resModel')
const { getBlogList, getBlogDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')

// 博客列表
router.get('/list', function(req, res, next) {
  const {author = null, keyword = null} = req.query
    // if(req.query.isadmin) {
    //   const loginCheckResult = loginCheck(req)
    //   if (loginCheckResult) return loginCheckResult

    //   // 强制查询自己的博客
    //   author = req.session.username
    // }
    getBlogList(author, keyword).then(result => {
      res.json(new SuccessModel(result, '博客列表查询成功'))
    })
});

// 博客详情
router.get('/detail', (req, res, next) => {
  const { id=null } = req.query
  if (!id) return res.json(new ErrorModel('请输入博客id'))
  getBlogDetail(id).then(result => {
    res.json(new SuccessModel(result, '博客详情查询成功'))
  })
})

// 添加博客
router.post('/new', (req, res, next) => {
  // const loginCheckResult = loginCheck(req)
    // if (loginCheckResult) return loginCheckResult
    // req.body.author = req.session.username
    newBlog(req.body).then(result => {
      res.json(new SuccessModel(result, '新增博客成功'))
    })
})

// 编辑博客
router.post('/update', (req, res, next) => {
  const { id } = req.query
  // const loginCheckResult = loginCheck(req)
  // if (loginCheckResult) return loginCheckResult
  updateBlog(id, req.body).then(result => {
    const obj = result ? new SuccessModel('博客编辑成功') : new ErrorModel('博客编辑失败')
    res.json(obj)
  })
})

// 删除博客
router.post('/del', (req, res, next) => {
  const { id } = req.query
  // const loginCheckResult = loginCheck(req)
  const author = req.session.username || ''
  // if (loginCheckResult) return loginCheckResult
  deleteBlog(id, author).then(result => {
    const obj = result ? new SuccessModel('博客删除成功') : new ErrorModel('博客删除失败')
    res.json(obj)
  })
})

module.exports = router;
