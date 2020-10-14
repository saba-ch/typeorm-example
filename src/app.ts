import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.set('trust proxy', true)
app.use(bodyParser.json())

export default app