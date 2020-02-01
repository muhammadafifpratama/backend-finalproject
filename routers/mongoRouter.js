let express = require('express')
let router = express.Router()

let { mongoController } = require('../controllers')

router.get('/home', mongoController.getGame)

module.exports = router