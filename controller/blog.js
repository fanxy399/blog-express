
const xss = require('xss')
const {exec} = require('../db/mysql')

const getBlogList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if(author) sql += `and author = ${author} `
  if(keyword) sql += `and title like '%${keyword}%' ` 
  sql += `order by createtime desc;`
  return exec(sql)
}

const getBlogDetail = (id) => {
  const sql = `select * from blogs where id = ${id}`
  return exec(sql).then(res => res[0])
}

const newBlog = (blogData = {}) => {
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const author = blogData.author
  
  const sql = `insert into blogs (title,content,createtime,author) values('${title}','${content}', '${Date.now()}', '${author}');`
  return exec(sql).then(res => ({id: res.insertId}))
}

const updateBlog = (id, blogData = {}) => {
  const {title, content} = blogData
  const sql = `update blogs set title='${title}',content='${content}' where id = '${id}' ;`
  return exec(sql).then(res => {
    return res.affectedRows > 0
  })
}

const deleteBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}';`
    return exec(sql).then(res => {
      return res.affectedRows > 0
    })
}

module.exports = {
  getBlogList,
  getBlogDetail,
  newBlog,
  updateBlog,
  deleteBlog
}