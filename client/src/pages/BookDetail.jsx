import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const BookDetail = () => {
  const { id } = useParams();
  const { user } = useAppContext();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    axios.get(`http://localhost:5000/books/${id}`).then((res) => setBook(res.data));
    axios.get(`http://localhost:5000/reviews?bookId=${id}`).then((res) => setReviews(res.data));
  }, [id]);


const submitReview = async () => {
  try {
    const res = await axios.post("http://localhost:5000/reviews", {
      bookId: id,
      userId: user?._id,
      rating,
      comment,
    });
    setReviews([...reviews, res.data]);
    setComment("");
    setRating(5);
  } catch (error) {
    console.error("Error submitting review", error);
  }
};


  if (!book) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
      <p className="text-gray-700 mb-4">{book.description}</p>
      <img src={book.coverImage} alt={book.title} className="h-60 object-cover mb-4" />
      <h2 className="text-xl font-semibold mt-4 mb-2">Reviews</h2>
      {reviews.map((rev, i) => (
        <div key={i} className="border-t py-2">
          <p className="text-sm text-gray-800">Rating: {rev.rating}</p>
          <p className="text-sm text-gray-600">{rev.comment}</p>
        </div>
      ))}
      <div className="mt-4">
        <textarea
          className="border w-full p-2 mb-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a review..."
        />
        <input
          type="number"
          value={rating}
          min={1}
          max={5}
          onChange={(e) => setRating(e.target.value)}
          className="border w-full p-2 mb-2"
        />
        <button onClick={submitReview} className="bg-blue-500 text-white px-4 py-2">Submit Review</button>
      </div>
    </div>
  );
};
export default BookDetail;
