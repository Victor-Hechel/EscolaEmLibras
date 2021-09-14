import MediaService from "../services/MediaService.js";
import ExtensaoInvalidaException from "../model/exceptions/ExtensaoInvalidaException.js"

export default class MediaController {

    mediaService;

    constructor() {
        this.mediaService = new MediaService()
    }

    async upload(req, resp) {

        const media = req.files.media;

        if(!media){
            resp.status(422).json({ message: "Missing media" })
            return
        }

        if(media.truncated){
            resp.status(413).json({ message: "Payload too large, max media size of 500 MB" })
            return
        }
        
        try{

            const mediaEntry = await this.mediaService.upload(media)
            
            resp.status(200).json({
                message: "Upload bem sucedido", 
                info: {
                    id: mediaEntry._id,
                    expiresIn: mediaEntry.expiresIn
                } 
            })
    
        }catch(e){
            if(e instanceof ExtensaoInvalidaException){
                resp.status(422).json({ mensagem: e.message })
            }else{
                console.log(e)
                resp.status(500).json({ mensagem: "Falha ao tentar adicionar o arquivo" })    
            }
        }

    }
}