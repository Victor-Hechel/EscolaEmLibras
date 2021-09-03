import MediaController from "../controllers/MediaController.js"

export default class MediaRoutes {
    static initializeRoutes(router) {

        router.post('/', MediaController.upload)

        return router
    }
}