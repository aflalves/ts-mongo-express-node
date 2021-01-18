const USER_NAME = ''
const PASSWORD = ''
const DB_NAME = ''

export const MONGODB_URI = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.jppwp.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

export const PORT = process.env.PORT || 8080

export const APP_SECRET = process.env.SECRET || 'secret'