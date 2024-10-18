import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import bookService from "../../../services/books.service";

const Books = () => {
  const { data } = useLoaderData();
  const [book, setBook] = useState({
    title: "",
    author: "",
  });
  const [books, setBooks] = useState(data);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBook({ ...book, [id]: value });
  };

  const handleClick = async () => {
    try {
      const { data, status } = await bookService.addBook(book);
      if (status === 201) {
        alert("Book Added Successfully");
        setBook({
          title: "",
          author: "",
        });
        setBooks([...books, data]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to add book");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data, status } = await bookService.deleteBook(id);
      if (status === 200) {
        alert("Book deleted successfully");
        setBooks(books.filter((book) => book._id !== id));
      } else {
        console.log(data);
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete book");
    }
  };
  return (
    <div>
      <div>
        {books.map((book) => (
          <div key={book._id}>
            <p>{book.title}</p>
            <p>{book.description}</p>
            <button>EDIT</button>
            <button onClick={() => handleDelete(book._id)}>DELETE</button>
          </div>
        ))}
      </div>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={book.title}
        onChange={handleChange}
      />
      <label htmlFor="author">author:</label>
      <input
        type="text"
        id="author"
        value={book.author}
        onChange={handleChange}
      />

      <button onClick={handleClick}>Add Book</button>
      {/* <input type="text" id="" /> */}
    </div>
  );
};

export default Books;
