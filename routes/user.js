const express = require('express')
const router = express()

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})
// 檢查登入
router.post('/login', (req, res, next) => {
  res.send('login check')
})
// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})
// 檢查註冊
router.post('/register', (req, res, next) => {
  res.send('register check')
})
// 登出
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router
