import express from 'express'
import fruitService from '../services/fruitService'
const router = express.Router()

router.post('/reset', (_request, response) => {
  fruitService.resetFruit()
  response.status(204).send('fruit has been reset')
})

export default router
