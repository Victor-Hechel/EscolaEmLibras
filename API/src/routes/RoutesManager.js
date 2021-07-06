import { Router } from "express"
import AdminRoutes from "./AdminRoutes.js"

export default class RoutesManager {

    constructor(app) {
        this.app = app
    }

    initializeRoutes(){
        this.initializeAdmin()
    }

    initializeAdmin(){
        const router = AdminRoutes.initializeRoutes(Router())
        this.app.use('/admin', router)
    } 
}