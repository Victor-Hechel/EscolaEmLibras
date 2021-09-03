import mongoose from "mongoose"
import sharp from "sharp"
import MediaEntry from "../model/MediaEntry.js"
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg"
import ffprobe from "@ffprobe-installer/ffprobe"
import Ffmpeg from "fluent-ffmpeg"

// const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
// const ffprobe = require("@ffprobe-installer/ffprobe");


export default class MediaController {



    static async upload(req, resp, next) {

        const allowedImageExtensions = ['.jpg', '.jpeg', '.svg', '.png' ]
        const allowedVideoExtensions = ['.mp4', '.avi', '.amv', '.mpeg', '.ogg']

        let media = req.files.media;

        if(!media){
            resp.status(422).json({ message: "Missing media" })
            return
        }

        if(media.truncated){
            resp.status(413).json({ message: "Payload too large, max media size of 500 MB" })
            return
        }

        const mediaEntry = new MediaEntry();
        mediaEntry.id = new mongoose.Types.ObjectId()

        const extBegin = media.name.lastIndexOf('.')

        const ext = media.name.substr(extBegin)
        if(allowedImageExtensions.includes(ext))
            mediaEntry.type = 'image'
        else if(allowedVideoExtensions.includes(ext))
            mediaEntry.type = 'video'
        
        if(!mediaEntry.type){
            resp.status(422).json({ message: "Invalid format" })
            return
        }
        
        

        try{

            if(mediaEntry.type == 'video'){
                await media.mv("uploads/" + mediaEntry.id + ext);
                
                
                // const ffmpegCommand = Ffmpeg().setFfprobePath(ffprobe.path)
                //     .setFfmpegPath(ffmpegInstaller.path);
                
                // await new Promise((resolve, reject) => {
                //     ffmpegCommand.input("uploads/tmp/" + mediaEntry.id + ext)
                //     .output('uploads/small5.mp4')
                //     .noAudio()
                //     .videoCodec('libx265')
                //     .on("end", () => {
                //         console.log("Ended");
                //         resolve()
                //     })
                //     .on("error", (e) =>{
                //         console.log(e)
                //         reject(new Error(e))
                //     })
                //     .run();
                // })
            }else if(mediaEntry.type == 'image') {
                await sharp(media.data)
                    .webp({ quality: 20 })
                    .toFile('uploads/' + mediaEntry.id + ".webp")
            
            }
            
            mediaEntry.expiresIn = Date.now()
            mediaEntry.expiresIn.setHours(mediaEntry.expiresIn.getHours()+1)
            await mediaEntry.save()
            
            resp.status(200).json({
                message: "Upload bem sucedido", 
                info: {
                    id: mediaEntry.id,
                    expiresIn: mediaEntry.expiresIn
                } 
            })
    
        }catch(err){
            console.log(err)
            resp.status(500).json({ msg: "Falha ao tentar adicionar o arquivo" })
        }

    }
}