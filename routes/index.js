const express = require('express')
const router = express.Router()
const indexController = require('../controllers/indexController')
// make a GET request that will redirect you to the longUrl everytime the shortUrl is visited
router.get('/:urlcode', indexController)

router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router