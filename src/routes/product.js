const express = require('express')
const router = express.Router()
const { Op } = require('sequelize')

const sequelize = app.get('sequelize')
const Product = sequelize.models['product']

router.get('/', async (req, res) => {
  const { price = 0 } = req.query

  try {
    // const sql = `
    // select * 
    // from products`
    // const result = await sequelize.query(sql)

    const product = await Product.all({
      attributes: ['product_name_en', 'price', 'id'],
      where: {
        price: {
          [Op.lt]: price
        },
        id: { [Op.gt]: 50 }
      },
      order: [['price', 'DESC'], 'product_name_en'],
      limit: 10
    })
    //const result = await Product.all()
    // {
    //   where: {
    //     product_name_en: 'NewProduct'
    //   }
    // }
    res.json(product)
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  const product = req.body
  // console.log(res.body)
  try {
    const p = await Product.create(product)
    res.status(201).json(p)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
  res.status(201).end()
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    // const sql = `
    // select * 
    // from products`
    // const result = await sequelize.query(sql)
    const result = await Product.findById(id)

    res.json(result)
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
})
router.put('/:id', async (req, res) => {
  const formData = req.body
  const { id } = req.params
  try {
    const p = await Product.findById(id)
    await p.update(formData)

    res.status(200).end()
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const p = await Product.findById(id)
    await p.destroy()
    res.status(200).end()
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})


module.exports = router