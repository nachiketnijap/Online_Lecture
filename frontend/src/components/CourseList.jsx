import React, { useEffect, useState } from "react";

import "./CourseList.css";
const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  console.log(courseList);
  const getLectures = async () => {
    await fetch("http://localhost:8080/api/lecture/getAllLecture")
      .then((res) => res.json())
      .then((data) => {
        setCourseList(data.lectures);
      });
  };
  useEffect(() => {
    getLectures();
  }, []);

  return (
    <div className="list-product">
      <h1>All Lecture List</h1>
      <div className="listproduct-format-main">
        <p>Course Id</p>
        <p>Instructor Id</p>
        <p>Date</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {courseList.map((item, index) => {
          return (
            <>
              <div
                key={index}
                className="listproduct-format-main listproduct-format"
              >
                <p>{item.courseId}</p>
                <p>{item.instructorId}</p>
                <p>{item.date}</p>
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default CourseList;
