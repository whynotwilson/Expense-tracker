const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

// 設定路由
// 列出全部 & filter
router.get('/', authenticated, (req, res) => {
  Record.find({ userId: req.user._id })
    .collation({ locale: 'en_US' }) // 設定英文語系
    .lean()
    .exec((err, records) => {
      if (err) return console.log(err)
      records.forEach((record) => {
        record.date = record.date.toISOString().slice(0, 10) // 把日期轉成字串 xxxx-xx-xx 的格式
      })
      return res.render('index', { records })
    })
})

// 顯示新增一筆 record 頁面
router.get('/new', authenticated, (req, res) => {
  let today = new Date()
  today = today.toISOString().slice(0, 10)
  console.log('today', today)
  return res.render('new', { today })
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
router.get('/:id/edit', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id })
    .lean()
    .exec((err, record) => {
      if (err) return console.log(err)
      record.date = record.date.toISOString().slice(0, 10)
      return res.render('edit', { record })
    })
})

// 修改 record
router.put('/:id', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.log(err)
    req.body.userId = req.user._id
    Object.assign(record, req.body)

    record.save(err => {
      if (err) return console.log(err)
      return res.redirect('/')
    })
  })
})

// 刪除 record
router.delete('/:id/delete', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.log(err)
    record.remove(err => {
      if (err) return console.log(err)
      return res.redirect('/')
    })
  })
})

module.exports = router
