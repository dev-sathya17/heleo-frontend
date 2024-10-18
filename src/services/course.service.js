import { protectedInstance } from "./instance";

const courseService = {
  addCourse: async (data) => {
    try {
      const response = await protectedInstance.post("/courses", data);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.log(error);
      return { data: error.response.data.message };
    }
  },
  deleteCourse: async (id) => {
    try {
      const response = await protectedInstance.delete(`/courses/${id}`);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.log(error);
      return { data: error.response.data.message };
    }
  },
};

export default courseService;
