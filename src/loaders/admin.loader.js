import adminService from "../services/admin.service";

const adminLoader = {
  fetchAllUsers: async () => {
    try {
      const response = await adminService.getAllUsers();
      return { data: response };
    } catch (error) {
      return error.response.data.message;
    }
  },
  fetchAllCourses: async () => {
    try {
      const response = await adminService.getAllCourses();
      return { data: response };
    } catch (error) {
      return error.response.data.message;
    }
  },
  fetchAllBooks: async () => {
    try {
      const response = await adminService.getAllBooks();
      return { data: response };
    } catch (error) {
      return error.response.data.message;
    }
  },
  fetchAllLeads: async () => {
    try {
      const response = await adminService.getAllLeads();
      return { data: response };
    } catch (error) {
      return error.response.data.message;
    }
  },
};

export default adminLoader;
