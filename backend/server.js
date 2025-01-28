import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import carRouter from "./routes/carRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import adminRouter from "./routes/adminRoute.js"
import 'dotenv/config.js'

// config
const app = express()
const port = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB()

// api endpoint
app.use("/api/admin", adminRouter)
app.use("/api/accessories/", carRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)



app.get("/", (req, res)=>{
    res.send("EVolution backend working")
})

app.listen(port, ()=>{
    console.log(`backend server started  on http://localhost:${port}`)
})


