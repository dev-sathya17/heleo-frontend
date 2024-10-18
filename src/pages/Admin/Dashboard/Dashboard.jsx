import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button>
        <NavLink to={"/admin/users"}>Manage Users</NavLink>
      </button>
      <button>
        <NavLink to={"/admin/courses"}>Manage Courses</NavLink>
      </button>
      <button>
        <NavLink to={"/admin/books"}>Manage Books</NavLink>
      </button>
      <button>
        <NavLink to={"/admin/leads"}>Manage Leads</NavLink>
      </button>
    </div>
  );
};

export default Dashboard;
