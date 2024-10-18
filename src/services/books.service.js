import { protectedInstance } from "./instance";

const bookService = {
  addBook: async (data) => {
    try {
      const response = await protectedInstance.post("/books", data);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.log(error);
      return { data: error.response.data.message };
    }
  },
  deleteBook: async (id) => {
    try {
      const response = await protectedInstance.delete(`/books/${id}`);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.log(error);
      return { data: error.response.data.message };
    }
  },
};

export default bookService;
