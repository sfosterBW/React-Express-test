import app from './src/app'
import http from 'http'
import config from './src/utils/config'

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
