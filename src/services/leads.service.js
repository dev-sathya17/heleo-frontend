import { protectedInstance } from "./instance";

const leadsService = {
  addLeads: async (data) => {
    try {
      const response = await protectedInstance.post("/leads", data);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.log(error);
      return { data: error.response.data.message };
    }
  },
  deleteCourse: async (id) => {
    try {
      const response = await protectedInstance.delete(`/leads/${id}`);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.log(error);
      return { data: error.response.data.message };
    }
  },
};

export default leadsService;
