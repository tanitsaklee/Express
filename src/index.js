const express = require('express')
// const app = express()
app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
/**
 * setup sequelize
 */
const Sequelize = require('sequelize')
const options = {
  operatorsAliases: false
}
const sequelize = new Sequelize('mysql://root:1234@127.0.0.1/tutor4dev', options)

app.set('sequelize', sequelize)

/**
 * setup model
 */

require('./models/product')()
require('./models/customer')()
const User = require('./models/user')()
// User.sync({ force: true })

/**
 * setup cores
 */
const cors = require('./middleware/cors')
const preflight = require('./middleware/preflight')
app.use(cors, preflight)

const jwt = require('./middleware/jwt')
/**
 * setup preflight
 */

// //midleware
// const m1 = (erq, res, next) => {
//   console.log('m1')
//   if (true) {
//     next()
//   }
//   else {
//     res.status(401).end()
//   }
// }


// //midleware
// const m2 = (erq, res, next) => {
//   console.log('m2')
//   if (true) {
//     next()
//   }
//   else {
//     res.status(401).end()
//   }
// }

// app.use(m1)

app.get('/', (req, res) => {
  res.json([1, 2, 3, 4, 5, 6])
})
app.use('/api/users', require('./routes/user'))
app.use('/api/product', jwt, require('./routes/product'))
app.use('/api/customer', require('./routes/Customer'))
// app.use(require('./api/v1/Customer', require('./routes/Customer')))


app.use(require('./middleware/404'))
app.listen(3000)