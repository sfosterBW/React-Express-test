const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {
  response.json({ title: 'Express' })
})

module.exports = router
