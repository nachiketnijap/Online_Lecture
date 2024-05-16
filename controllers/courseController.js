const courseModel=require('../models/courseModel')


const postCourseController=async(req,res)=>{

  try{  
    const course = new courseModel(req.body);
    await course.save();
    res.status(201).send({message:'Course Created',success:true, course})
  }
  catch(error){

    res.status(500).send({success:false, message:`Course Controller ${error.message}`})
  }
}

const getAllCourseController=async(req,res)=>{
  try {
    const courses = await courseModel.find();
    res.status(201).send({message:'All courses fetched',success:true,courses});

  } catch (error) {
    res.status(500).json({ message: err.message });
  }
}



module.exports={postCourseController,getAllCourseController}