const express=require('express')
const { postCourseController, getAllCourseController } = require('../controllers/courseController')


//router object
const router=express.Router()

//Create course || Post 
router.post('/postCourse',postCourseController)

//get all courses
router.get('/allCourses',getAllCourseController)


module.exports=router