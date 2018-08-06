module.exports = (req, res, next) => {
  res.status(404).json({ mesage: '404 Page not Found' })
}