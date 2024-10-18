import { useState } from "react";
import courseService from "../../../services/course.service";
import { useLoaderData } from "react-router-dom";

const Courses = () => {
  const { data } = useLoaderData();
  const [course, setCourse] = useState({
    title: "",
    duration: "",
    description: "",
    price: "",
  });
  const [courses, setCourses] = useState(data);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCourse({ ...course, [id]: value });
  };

  const handleClick = async () => {
    try {
      const { data, status } = await courseService.addCourse(course);
      if (status === 201) {
        alert("Course Added Successfully");
        setCourse({
          title: "",
          duration: "",
          description: "",
          price: "",
        });
        console.log(data);
        setCourses([...courses, data]);
      } else {
        console.log(data);
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to add course");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data, status } = await courseService.deleteCourse(id);
      if (status === 200) {
        alert("Course deleted successfully");
        setCourses(courses.filter((course) => course._id !== id));
      } else {
        console.log(data);
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete course");
    }
  };

  return (
    <div>
      <div className="courses">
        {courses.map((course) => (
          <div key={course._id}>
            <p>{course.title}</p>
            <p>{course.description}</p>
            <p>{course.price}</p>
            <p>{course.duration}</p>
            <button>EDIT</button>
            <button onClick={() => handleDelete(course._id)}>DELETE</button>
          </div>
        ))}
      </div>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={course.title}
        onChange={handleChange}
      />
      <label htmlFor="description">description:</label>
      <input
        type="text"
        id="description"
        value={course.description}
        onChange={handleChange}
      />
      <label htmlFor="price">price:</label>
      <input
        type="number"
        id="price"
        value={course.price}
        onChange={handleChange}
      />
      <label htmlFor="duration">duration:</label>
      <input
        type="number"
        id="duration"
        value={course.duration}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add Course</button>
      {/* <input type="text" id="" /> */}
    </div>
  );
};

export default Courses;
