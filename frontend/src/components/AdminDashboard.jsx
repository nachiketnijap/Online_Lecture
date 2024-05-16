import React from "react";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            E-Learning
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/addCourse"} className="text-decoration-none">
                  <a className="nav-link active" aria-current="page" href="#">
                    Add Course
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/addLecture"} className="text-decoration-none">
                  <a className="nav-link  text-decoration-none" href="#">
                    Create Lecture
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/lectureDetails"} className="text-decoration-none">
                  <a className="nav-link" href="#">
                    Lecture Details
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminDashboard;
