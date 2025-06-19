const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/bookreview", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Book = require("./models/Book");
const Review = require("./models/Review");
const User = require("./models/User");

// GET all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});


// GET a book by ID
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving book" });
  }
});


// POST a new book (admin-only simulation)
app.post("/books", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});

// GET reviews for a book
app.get("/reviews", async (req, res) => {
  const reviews = await Review.find({ bookId: req.query.bookId });
  res.json(reviews);
});

// POST a review
app.post("/reviews", async (req, res) => {
  const { bookId, userId, rating, comment } = req.body;
  if (!bookId || !userId || !comment || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Invalid review data" });
  }

  try {
    const review = new Review({ bookId, userId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: "Error saving review" });
  }
});


// GET user profile
app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// PUT update user profile
app.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

app.listen(5000, () => console.log("Server running on port 5000"));