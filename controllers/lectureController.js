const lectureModel =require('../models/lectureModel')

const createLectureController=async(req,res)=>{

  try{  
    const lecture = new lectureModel({
      courseId: req.body.courseId,
      instructorId: req.body.instructorId,
      date: req.body.date,
    });

    const existingLecture = await lectureModel.findOne({
      instructorId: req.body.instructorId,
      date: req.body.date
    });

    if (existingLecture) {
      return res.status(400).json({ message: 'Instructor is not available on this date' });
    }

    const newLecture = await lecture.save();
   
    res.status(201).send({message:'Lecture Created',success:true, newLecture})
  }
  catch(error){

    res.status(500).send({success:false, message:`Lecture Controller ${error.message}`})
  }
}

const getAllLectureController=async(req,res)=>{
  try {
    const lectures = await lectureModel.find();
    res.status(201).send({message:'All Lectures fetched',success:true,lectures});

  } catch (error) {
    res.status(500).json({ message: err.message });
  }
}




module.exports={createLectureController,getAllLectureController}