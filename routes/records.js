const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

// 設定路由
// 列出全部 & filter
router.get('/', authenticated, (req, res) => {
  const month = req.query.month || ''
  const category = req.query.category || ''

  // let dateRegex = new RegExp('')
  // if (month) {
  //   dateRegex = new RegExp(`[0-9]{4}-${month}-[0-9]{2}`)
  // } else {
  //   dateRegex = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}')
  // }

  let categoryRegex = new RegExp('')
  if (category) {
    categoryRegex = new RegExp(category)
  } else {
    categoryRegex = new RegExp('[a-zA-Z]')
  }

  // console.log('dateRegex', dateRegex)
  console.log('categoryRegex', categoryRegex)

  // Record.find({ userId: req.user._id })
  Record.find({ userId: req.user._id, category: { $regex: categoryRegex } })
    .collation({ locale: 'en_US' }) // 設定英文語系
    .lean()
    .exec((err, records) => {
      // 轉換 date 格式給前端使用
      if (err) return console.log(err)
      records.forEach((record) => {
        record.date = record.date.toISOString().slice(0, 10) // 把日期 Date 格式 轉成字串 xxxx-xx-xx 的格式
      })
      // 篩選月份
      if (month) {
        console.log('if (month)')
        records = records.filter((record) => {
          return record.date.slice(4, 8).includes(month)
        })
      }

      console.log('month', month)
      // test
      records.forEach((record) => {
        console.log(record.date)
      })

      console.log('-------')
      console.log('')
      return res.render('index', { records, month, category })
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
