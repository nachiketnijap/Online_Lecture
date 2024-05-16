const express=require('express')
const {  createLectureController, getAllLectureController } = require('../controllers/lectureController')


//router object
const router=express.Router()

//Create course || Post 
router.post('/createLecture',createLectureController)

// get all lecture || get
router.get('/getAllLecture',getAllLectureController)




module.exports=router