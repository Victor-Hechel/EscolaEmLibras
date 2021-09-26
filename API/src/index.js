import express, { urlencoded, json } from 'express'
import RouterControl from './routes/RoutesManager.js'
import fileUpload from 'express-fileupload'
import MediaEntry from "./model/MediaEntry.js"
import { unlink } from 'fs/promises';
import cron from 'node-cron';
import cors from 'cors'

import Mongoose from 'mongoose'

Mongoose.connect('mongodb://localhost:27017/escolaemlibras', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
Mongoose.set('useFindAndModify', false);

const app = express()
const port = 3002

app.options('*', cors())
app.use((req, resp, next) => {
    resp.header("Access-Control-Allow-Origin", "*")
    resp.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS, PUT")
    resp.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    app.use(cors())
    next()
})

app.use(urlencoded({ extended: false }))
app.use(json())
app.use(fileUpload({
    limits: {
        fileSize: 500 * 1024 * 1024
    }
}))

new RouterControl(app).initializeRoutes()

cron.schedule('0 */1 * * *', function() {
    console.log(new Date(), ' running a task every hour');
    limparTudo();
});
  

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


async function limparTudo(){

    const dataAtual = new Date().toISOString().split('T')[0]

    const results = await MediaEntry.find({ expiresIn: { $lte: dataAtual } })

    for(const mediaEntry of results){
        try{
            await mediaEntry.remove()
            await unlink(`uploads/${mediaEntry.id}.${mediaEntry.type == 'image' ? 'webp' : "mp4"}`)
        }catch(err){
            console.log(`Error trying to delete media entry ${mediaEntry.id}`, err)
        }
    }
}