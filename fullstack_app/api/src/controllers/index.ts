import express from 'express'
const router = express.Router()

router.get('/', (_request, response) => {
  response.json({ title: 'Express', env: process.env.NODE_ENV })
})

export default router
