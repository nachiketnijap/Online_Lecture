import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import Course from "./components/Course";
import CreateLecture from "./components/CreateLecture";
import CourseList from "./components/CourseList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AdminDashboard />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          {/* <Route path="/adminDashboard" element={<AdminDashboard />}></Route> */}
          <Route path="/addCourse" element={<Course />} />
          <Route path="/addLecture" element={<CreateLecture />} />
          <Route path="/lectureDetails" element={<CourseList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
