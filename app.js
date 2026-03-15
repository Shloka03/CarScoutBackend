const express = require("express")
const app = express()
const cors = require("cors")

require("dotenv").config()
app.use(express.json())
app.use(cors()) //allow all requests

const DBConnection = require("./src/utils/DBConnection")
DBConnection()

const userRoutes = require("./src/routes/UserRoutes")
app.use("/user",userRoutes)

const carRoutes = require("./src/routes/CarRoutes")
app.use("/cars",carRoutes)

const listingRoutes = require("./src/routes/CarListingRoutes")
app.use("/listings",listingRoutes)

const testDriveRoutes = require("./src/routes/TestDriveRoutes")
app.use("/testdrive",testDriveRoutes)

const transactionRoutes = require("./src/routes/TransactionRoutes")
app.use("/transactions",transactionRoutes)

const paymentRoutes = require("./src/routes/PaymentRoutes")
app.use("/payments",paymentRoutes)

const adminRoutes = require("./src/routes/AdminRoutes")
app.use("/admin",adminRoutes)

const reportRoutes = require("./src/routes/InspectionReportRoutes")
app.use("/reports",reportRoutes)

const mediaRoutes = require("./src/routes/MediaGalleryRoutes")
app.use("/media",mediaRoutes)


const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})
//server creation