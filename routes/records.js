const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { authenticated } = require('../config/auth')

// 設定路由
// 列出全部 & filter
router.get('/', authenticated, (req, res) => {
  res.render('index')
})

// 顯示新增一筆 record 頁面

// 顯示查看單筆 record 詳細內容

// 新增一筆 record

// 顯示修改 record 頁面

// 修改 record

// 刪除 record

module.exports = router
