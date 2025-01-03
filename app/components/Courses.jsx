import Link from "next/link";

// Fetch Courses functionality added to main page
// async function fetchCourses() {
//   const response = await fetch("http://localhost:3000/api/courses");

//   const courses = await response.json(); // Extract JSON data
//   return courses;
// }

const Courses = ({ courses }) => {
  // Fetch Courses functionality added to main page
  // const courses = await fetchCourses();
  // console.log(courses);
  return (
    <div className="courses">
      {courses.map((course) => (
        <div key={course.id} className="card">
          <h3>{course.title}</h3>
          <small>Level: {course.level}</small>
          <p>{course.description}</p>
          <Link href={course.link} target="_blank" className="btn">
            Go To Course
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Courses;
