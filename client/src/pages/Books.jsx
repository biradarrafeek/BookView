import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/books").then((res) => {
      setBooks(res.data);
    });
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <input
        type="text"
        placeholder="Search books..."
        className="border px-2 py-1 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        {filteredBooks.map((book) => (
          <Link key={book._id} to={`/books/${book._id}`} className="border p-4">
            <img src={book.coverImage} alt={book.title} className="h-40 object-cover" />
            <h2 className="text-xl mt-2">{book.title}</h2>
            <p className="text-sm text-gray-600">{book.author}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Books;