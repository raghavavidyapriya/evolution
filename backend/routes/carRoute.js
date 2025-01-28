import express from "express"
import { addCar, listCars, removeCars } from "../controllers/carControllers.js"
import multer from "multer"
import authAdminMiddleware from "../middleware/authAdmin.js"

const carRouter = express.Router()

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

carRouter.get("/list", listCars)
carRouter.post("/admin/add", authAdminMiddleware, upload.single("image"),addCar)
carRouter.post("/admin/delete", authAdminMiddleware, removeCars)

export default carRouter