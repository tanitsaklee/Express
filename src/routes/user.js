
const router = require('express').Router()
const sequelize = app.get('sequelize')
const User = sequelize.models['user']
// const sequelize = app.get('sequelize')
// const User = sequelize.models['user']
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/', async (req, res) => {
  const { username, password } = req.body

  try {
    console.log(username, password)
    const hashPassword = bcrypt.hashSync(password)
    // console.log(username, password, hashPassword)
    const u = await User.create({
      username,
      password: hashPassword
    })
    res.status(201).json({ username })
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const u = await User.findOne({
      where: {
        username
      }
    })
    if (!u) {
      res.status(401).end()
      return
    }
    if (bcrypt.compareSync(password, u.password)) {
      const token = jwt.sign({ username: u.username }, 'SECRET')

      res.status(200).json({ token })
    } else {
      res.status(401).end()
    }
    //console.log(u.password)
    res.status(201).json({ u })
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
// router.get('/', async (req, res) => {
//   const { price = 0 } = req.query

//   try {
//     // const sql = `
//     // select * 
//     // from products`
//     // const result = await sequelize.query(sql)

//     const User = await Product.all()
//     //const result = await Product.all()
//     // {
//     //   where: {
//     //     product_name_en: 'NewProduct'
//     //   }
//     // }
//     res.json(product)
//   }
//   catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// router.post('/', async (req, res) => {
//   const product = req.body
//   // console.log(res.body)
//   try {
//     const p = await Product.create(product)
//     res.status(201).json(p)
//   } catch (e) {
//     res.status(500).json({ error: e.message })
//   }
//   res.status(201).end()
// })

// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params
//     // const sql = `
//     // select * 
//     // from products`
//     // const result = await sequelize.query(sql)
//     const result = await Product.findById(id)

//     res.json(result)
//   }
//   catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })
// router.put('/:id', async (req, res) => {
//   const formData = req.body
//   const { id } = req.params
//   try {
//     const p = await Product.findById(id)
//     await p.update(formData)

//     res.status(200).end()
//   } catch (e) {
//     res.status(500).json({ error: e.message })
//   }
// })

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params
//   try {
//     const p = await Product.findById(id)
//     await p.destroy()
//     res.status(200).end()
//   } catch (e) {
//     res.status(500).json({ error: e.message })
//   }
// })


// module.exports = router