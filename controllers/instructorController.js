const userModel=require('../models/userModel')


const registerController=async(req,res)=>{

  try{  
    const existingUser=await userModel.findOne({email:req.body.email})
    if(existingUser){
      return res.status(200).send({message:'User Already Exists',success:false})
    }
    const newUser=new userModel(req.body)
    await newUser.save()
    res.status(201).send({message:'Registered Successfully',success:true})
  }
  catch(error){

    res.status(500).send({success:false, message:`Register Controller ${error.message}`})
  }
}


// login controller 
const loginController=async(req,res)=>{
  try{
    const user=await userModel.findOne({email:req.body.email})
    if (!user){
      return res.status(200).send({message:'user not found', success:false})
    }
    const isMatch=await req.body.password === user.password
    if(!isMatch){
      return res.status(200).send({message:'Invalid Email or Password',success:false})
    }
    res.status(200).send({message:'Login Success',success:true})
  }
  catch(error){
    
    res.status(500).send({message:`Error in  Login CTRL ${error.message}`})
  }
}

const getAllInstructorController=async(req,res)=>{
  try {
    const instructors = await userModel.find();
    res.status(201).send({message:'All instructors fetched',success:true,instructors});

  } catch (error) {
    res.status(500).json({ message: err.message });
  }
}

const getLecturesAssignedToTheInstructor =async(req,res)=>{
  try {
    const instructors = await userModel.find().populate({
      path: 'courses',
      populate: {
        path: 'lectures',
        select: 'date' // Select only the date field of lectures
      }
    }).select('name courses'); // Select only name and courses fields of instructors
    console.log(instructors)
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


module.exports={registerController,loginController,getAllInstructorController,getLecturesAssignedToTheInstructor}