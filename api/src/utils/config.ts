import dotenv from 'dotenv'
dotenv.config()

let MONGODB_URI = process.env.MONGODB_URI
const PORT: string = process.env.PORT || '9000'

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

export default { MONGODB_URI, PORT }
