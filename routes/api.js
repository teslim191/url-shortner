const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController')




router.post('/shorturl', apiController)

  module.exports = router