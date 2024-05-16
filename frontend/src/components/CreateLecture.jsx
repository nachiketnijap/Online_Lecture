import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
const CreateLecture = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // Fetch courses from backend when component mounts
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/course/allCourses"
        );
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Handle error appropriately, such as setting an error state
      }
    };
    fetchCourses();
  }, []); // Empty dependency array means this effect runs only once, on component mount

  const fetchInstructors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/allInstructors"
      );
      setInstructors(response.data.instructors);
    } catch (error) {
      console.error("Error fetching instructors:", error);
      // Handle error appropriately, such as setting an error state
      setErrorMessage(
        "Failed to fetch instructors. Please select a different course."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedCourse);
    console.log(selectedInstructor);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/lecture/createLecture",
        {
          courseId: selectedCourse,
          instructorId: selectedInstructor,
          date,
        }
      );

      console.log(response.data);
      // Optionally, you can reset the form fields here
      if (response.data.success) {
        message.success("Lecture created successfully");
        console.log("success");
      } else {
        message.error("Instucor not available");
      }
    } catch (error) {
      message.error("Instucor not available");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-25 "
        style={{ marginTop: "50px" }}
      >
        <div>
          <label htmlFor="instructor">Course:</label>
          <select
            id="course"
            class="form-select form-select-sm m-2 p-3 rounded"
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              fetchInstructors(e.target.value); // Fetch instructors when course is selected
            }}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="instructor">Instructor:</label>
          <select
            className="form-select form-select-sm m-2 p-3 rounded"
            id="instructor"
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
          >
            <option value="">Select Instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor.id} value={instructor._id}>
                {instructor.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            className="m-2 p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-primary m-2 p-2">
          Create Lecture
        </button>
      </form>
    </div>
  );
};

export default CreateLecture;
