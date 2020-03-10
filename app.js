const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use('/', require('./routes/home'))
app.use('/users', require('./routes/user'))

app.listen(port, () => {
  console.log('app is running......')
})
