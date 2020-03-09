const express = require('express')
const app = express()
const port = 3000

app.use('/', require('./routes/home'))
app.use('/users', require('./routes/user'))

app.listen(port, () => {
  console.log('app is running......')
})
