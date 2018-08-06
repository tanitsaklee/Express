const express = require('express')
const router = express.Router()

const sequelize = app.get('sequelize')
const Customers = sequelize.models['customers']

router.get('/', async (req, res) => {
  try {
    // const sql = `
    // select * 
    // from products`
    // const result = await sequelize.query(sql)
    const result = await Customers.all(
      //   {
      //   where: {
      //     id: 3
      //   }
      // }
    )

    res.json(result)
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', (req, res) => {
  res.status(201).end()
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    // const sql = `
    // select * 
    // from products`
    // const result = await sequelize.query(sql)
    const result = await Customers.findById(id)

    res.json(result)
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
})


module.exports = router