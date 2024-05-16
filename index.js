const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path=require('path')
const multer=require("multer");
const cors = require("cors");

dotenv.config();

//mongoDb connection
connectDB();

//rest objec
const app =express()


//middlewares 
app.use(express.json())

app.use(cors());

// routes
app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/course", require("./routes/courseRoute"))
app.use("/api/lecture",require("./routes/lectureRoutes"))


// creating upload endpoint for images
const storage=multer.diskStorage({
  destination : './upload/images',
  filename:(req,file,cb) =>{
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload =multer({storage:storage});

app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('course'),(req,res)=>{
res.json({
  success:1 ,
  image_url:`http://localhost:${port}/images/${req.file.filename}`
})
})

//port                      
const port=process.env.PORT || 8080


//listen
app.listen(port, ()=>{
  console.log(
    `Server is running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
  );
})