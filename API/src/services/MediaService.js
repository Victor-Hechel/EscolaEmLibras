import sharp from "sharp"
import MediaEntry from "../model/MediaEntry.js"
import ExtensaoInvalidaException from "../model/exceptions/ExtensaoInvalidaException.js"

// import ffmpegInstaller from "@ffmpeg-installer/ffmpeg"
// import ffprobe from "@ffprobe-installer/ffprobe"
// import Ffmpeg from "fluent-ffmpeg"

// const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
// const ffprobe = require("@ffprobe-installer/ffprobe");

export default class MediaService {

    allowedImageExtensions = ['.jpg', '.jpeg', '.svg', '.png' ]
    allowedVideoExtensions = ['.mp4', '.avi', '.amv', '.mpeg', '.ogg']

    async upload(media) {
        const mediaEntry = new MediaEntry();

        const ext = this.getExtensao(media.name)

        const tipo = this.getMediaType(ext)

        if(!tipo){
            throw new ExtensaoInvalidaException("Tipo de arquivo não suportado")
        }

        mediaEntry.type = tipo

        if(mediaEntry.type == 'video'){
            mediaEntry.extension = ext
            await this.uploadVideo(mediaEntry._id, ext, media)
        }else if(mediaEntry.type == 'image') {
            mediaEntry.extension = '.webp'
            await this.uploadImage(mediaEntry._id, media)
        }
        
        mediaEntry.expiresIn = Date.now()
        mediaEntry.expiresIn.setHours(mediaEntry.expiresIn.getHours()+1)
        return await mediaEntry.save()
    }

    getExtensao(mediaName){
        const extBegin = mediaName.lastIndexOf('.')

        return mediaName.substr(extBegin)
    }

    getMediaType(ext){
        
        if(this.allowedImageExtensions.includes(ext))
            return 'image'
        else if(this.allowedVideoExtensions.includes(ext))
            return 'video'
        
        return null
    }

    async uploadImage(name, media){
        await sharp(media.data)
                .webp({ quality: 20 })
                .toFile(`uploads/${name}.webp`)
    }

    async uploadVideo(name, ext, media){
        await media.mv("uploads/" + name + ext);
            
            
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
    }

}