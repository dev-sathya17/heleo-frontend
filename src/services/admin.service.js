import { protectedInstance } from "./instance";

const adminService = {
  getAllUsers: async () => {
    try {
      const response = await protectedInstance.get("/users");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  getAllCourses: async () => {
    try {
      const response = await protectedInstance.get("/courses");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  getAllBooks: async () => {
    try {
      const response = await protectedInstance.get("/books");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  getAllLeads: async () => {
    try {
      const response = await protectedInstance.get("/leads");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
};

export default adminService;
