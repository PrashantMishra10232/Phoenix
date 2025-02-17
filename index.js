import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./utils/connection.js";

const app = express();

//config
dotenv.config({
    path: "./.env"
});

console.log("MongoDB URI:", process.env.MONGODB_URI);


//middlewares
app.use(express.json({limit:"16mb"}));
app.use(express.urlencoded({
    extended:true
}));
app.use(cookieParser());
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

//connection
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error:", error);
        throw error;
    })
    app.listen(process.env.PORT||8000,()=>{
    console.log(`Server running at port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB Connection is failed",err);  
})


//declaration of routes
import userRouter from "./routes/user.routes.js"
import gadgetsRouter from "./routes/gadgets.routes.js"


app.use("/api/v1/user",userRouter);
app.use("/api/v1/gadgets",gadgetsRouter);