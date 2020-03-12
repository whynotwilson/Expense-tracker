const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

// 設定路由
// 列出全部 & filter
router.get('/', authenticated, (req, res) => {
  return res.render('index')
})

// 顯示新增一筆 record 頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

// 顯示查看單筆 record 詳細內容
// router.get('/:id', authenticated, (req, res) => {
//   Record.findOne({ _id: req.params.id, userId: req.user._id })
//     .lean()
//     .exec((err, record) => {
//       if (err) return console.log(err)
//       return res.render('detail', { record })
//     })
// })

// 新增一筆 record
router.post('/', authenticated, (req, res) => {
  req.body.userId = req.user._id
  const record = new Record(req.body)
  record.save(err => {
    if (err) return console.log(err)
    return res.redirect('/')
  })
})

// 顯示修改 record 頁面

// 修改 record

// 刪除 record

module.exports = router
