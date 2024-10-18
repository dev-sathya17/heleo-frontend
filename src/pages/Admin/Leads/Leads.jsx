import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import adminService from "../../../services/admin.service";
import leadsService from "../../../services/leads.service";

const Leads = () => {
  const { data } = useLoaderData();
  const [leads, setLeads] = useState(data);
  const [courses, setCourses] = useState([]);
  const [lead, setLead] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    state: "",
    forSelf: false,
    course: "",
    source: "",
    remarks: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await adminService.getAllCourses();
        setCourses(response);
      } catch (error) {
        console.log(error);
        alert("There was an error fetching courses");
      }
    };
    fetchCourses();
  }, [leads, lead]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setLead((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleClick = async () => {
    try {
      const { data, status } = await leadsService.addLeads(lead);
      if (status === 201) {
        alert("Lead Added Successfully");
        setLead({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          location: "",
          state: "",
          forSelf: false,
          course: "",
          source: "",
          remarks: "",
        });
        setLeads([...leads, data]);
      } else {
        console.log(data);
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to add Lead");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data, status } = await leadsService.deleteCourse(id);
      if (status === 200) {
        alert("Lead deleted successfully");
        setLeads(leads.filter((lead) => lead._id !== id));
      } else {
        console.log(data);
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete lead");
    }
  };

  return (
    <div>
      <div>
        {leads.map((lead) => (
          <div key={lead._id}>
            <p>{lead._id}</p>
            <button>EDIT</button>
            <button onClick={() => handleDelete(lead._id)}>DELETE</button>
            <button>Convert</button>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          onChange={handleChange}
          value={lead.firstName}
          placeholder="Firstname"
          id="firstName"
        />
        <input
          type="text"
          onChange={handleChange}
          value={lead.lastName}
          placeholder="last name"
          id="lastName"
        />
        <input
          type="email"
          onChange={handleChange}
          value={lead.email}
          placeholder="email"
          id="email"
        />
        <input
          type="tel"
          onChange={handleChange}
          value={lead.phone}
          placeholder="phone"
          id="phone"
        />
        <input
          type="text"
          onChange={handleChange}
          value={lead.location}
          placeholder="location"
          id="location"
        />
        <input
          type="text"
          onChange={handleChange}
          value={lead.state}
          placeholder="state"
          id="state"
        />
        <select id="course" value={lead.course} onChange={handleChange}>
          <option value="" disabled>
            Select a course
          </option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          onChange={handleChange}
          value={lead.source}
          placeholder="source"
          id="source"
        />
        <input
          type="checkbox"
          onChange={handleChange}
          checked={lead.forSelf}
          id="forSelf"
        />
        <input
          type="text"
          onChange={handleChange}
          value={lead.remarks}
          placeholder="remarks"
          id="remarks"
        />
        <button onClick={handleClick}>Add Lead</button>
      </div>
    </div>
  );
};

export default Leads;
