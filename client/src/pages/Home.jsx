import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/books").then((res) => {
      setBooks(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Featured Books</h1>
      <div className="grid grid-cols-2 gap-4">
        {books.map((book) => (
          <Link to={`/books/${book._id}`} key={book._id} className="border p-4">
            <img src={book.coverImage} alt={book.title} className="h-40 object-cover" />
            <h2 className="text-xl mt-2">{book.title}</h2>
            <p className="text-sm text-gray-600">{book.author}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Home;