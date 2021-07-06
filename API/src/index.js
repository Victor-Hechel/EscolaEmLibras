import express, { urlencoded, json } from 'express'
import RouterControl from './routes/RoutesManager.js'

import Mongoose from 'mongoose'

Mongoose.connect('mongodb://localhost:27017/escolaemlibras', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const app = express()
const port = 3000

app.use(urlencoded({ extended: false }))
app.use(json())

new RouterControl(app).initializeRoutes()

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})