import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Users from "./pages/Admin/Users/Users";
import adminLoader from "./loaders/admin.loader";
import Leads from "./pages/Admin/Leads/Leads";
import Courses from "./pages/Admin/Courses/Courses";
import Books from "./pages/Admin/Books/Books";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "admin",
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
        loader: adminLoader.fetchAllUsers,
      },
      {
        path: "leads",
        element: <Leads />,
        loader: adminLoader.fetchAllLeads,
      },
      {
        path: "courses",
        element: <Courses />,
        loader: adminLoader.fetchAllCourses,
      },
      {
        path: "books",
        element: <Books />,
        loader: adminLoader.fetchAllBooks,
      },
      { path: "*", element: <div>404</div> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
