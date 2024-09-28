import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button>
        <NavLink to={"/admin/users"}>Manage Users</NavLink>
      </button>
    </div>
  );
};

export default Dashboard;
