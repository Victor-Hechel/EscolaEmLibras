import MediaController from "../controllers/MediaController.js"

export default class MediaRoutes {
    static initializeRoutes(router) {
        const controller = new MediaController()
        router.post('/', controller.upload.bind(controller))

        return router
    }
}