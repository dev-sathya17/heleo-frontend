import { instance, protectedInstance } from "./instance";

const userService = {
  login: async (data) => {
    try {
      const response = await instance.post("/users/login", data, {
        withCredentials: true,
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      console.log(error);
      return { data: error.response.data.message };
    }
  },
  register: async (data) => {
    try {
      const response = await instance.post("/users/register", data);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.log(error);
      return { data: error.response.data.message };
    }
  },
  updateUser: async (id, data) => {
    try {
      const response = await protectedInstance.put(`/users/update/${id}`, data);
      return { data: response.data, status: response.status };
    } catch (error) {
      return error.response.data.message;
    }
  },
  deleteUser: async (id) => {
    try {
      const response = await protectedInstance.delete(`/users/delete/${id}`);
      return { data: response.data, status: response.status };
    } catch (error) {
      return error.response.data.message;
    }
  },
};

export default userService;
