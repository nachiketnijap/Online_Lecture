const express=require('express')
const {registerController, loginController, getAllInstructorController, getLecturesAssignedToTheInstructor} =require("../controllers/instructorController")

//router object
const router=express.Router()

//Register || Post 
router.post('/register',registerController)

//login || Post 
router.post('/login',loginController)

//All instructors 
router.get('/allInstructors',getAllInstructorController)

//assigned lecture
router.get('/assignedLectures',getLecturesAssignedToTheInstructor)
module.exports=router