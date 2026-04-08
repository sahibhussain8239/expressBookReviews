const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  // Task 6: Write the code to register a user and store the user details in a variable. Hint: The code should take the 'username' and 'password' provided in the body of the request for registration. If the username already exists, it must mention the same & must also show other errors like eg. when username & password are not provided.
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user. Username and password are required." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  // Task 1: Send JSON response with formatted books data. Hint: Use the JSON.stringify method for displaying the output neatly.
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  // Task 2: Retrieve the isbn parameter from the request URL and send the corresponding book details. Hint: Retrieve the ISBN from the request parameters
  const isbn = req.params.isbn;
  res.send(books[isbn] ? JSON.stringify(books[isbn], null, 4) : { message: "Book not found" });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  // Task 3: Retrieve the author parameter from the request URL and send the corresponding book details. Hints:
  // 1. Obtain all the keys for the 'books' object.
  // 2. Iterate through the 'books' array & check the author matches the one provided in the request parameters.
  const author = req.params.author;
  const booksByAuthor = Object.values(books).filter(book => book.author === author);
  res.send(booksByAuthor.length > 0 ? JSON.stringify(booksByAuthor, null, 4) : { message: "Books by this author not found" });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  // Task 4: Retrieve the title parameter from the request URL and send the corresponding book details. Hint: This will be similar to Exercise 3
  const title = req.params.title;
  const booksByTitle = Object.values(books).filter(book => book.title === title);
  res.send(booksByTitle.length > 0 ? JSON.stringify(booksByTitle, null, 4) : { message: "Books with this title not found" });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  // Task 5: Retrieve the isbn parameter from the request URL and send the corresponding book reviews. Hint: Get the book reviews based on ISBN provided in the request parameters.
  const isbn = req.params.isbn;
  res.send(books[isbn] && books[isbn].reviews ? JSON.stringify(books[isbn].reviews, null, 4) : { message: "Reviews not found" });
});

// Get the book list available in the shop using Promise callbacks or async-await with Axios.
public_users.get('/books', async function (req, res) {
  // Task 10: Add the code for getting the list of books available in the shop (done in Task 1) using Promise callbacks or async-await with Axios.Please ensure that the general.js file has the code for getting the list of books available in the shop using Promise callbacks or async-await with Axios is covered. 
  try {
    const response = await axios.get('http://localhost:5000/');
    res.status(200).send(JSON.stringify(response.data, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error fetching book list" });
  }
});

// Get the book details based on ISBN using Promise callbacks or async-await with Axios.
public_users.get('/books/isbn/:isbn', async function (req, res) {
  // Task 11: Add the code for getting the book details based on ISBN (done in Task 2) using Promise callbacks or async-await with Axios.Please ensure that the general.js file has the code for getting the book details based on ISBN using Promise callbacks or async-await with Axios is covered. 
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    res.status(200).send(JSON.stringify(response.data, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error fetching book details" });
  }
});

// Get the book details based on Author using Promise callbacks or async-await with Axios.
public_users.get('/books/author/:author', async function (req, res) {
  // Task 12: Add the code for getting the book details based on Author (done in Task 3) using Promise callbacks or async-await with Axios.Please ensure that the general.js file has the code for or getting the book details based on Author using Promise callbacks or async-await with Axios is covered.  
  const author = req.params.author;
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book details" });
  }
});

// Get the book details based on Title using Promise callbacks or async-await with Axios.
public_users.get('/books/title/:title', async function (req, res) {
  // Task 13: Add the code for getting the book details based on Title (done in Task 4) using Promise callbacks or async-await with Axios.Please ensure that the general.js file has the code for or getting the book details based on Title using Promise callbacks or async-await with Axios is covered.
  const title = req.params.title;
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    res.status(200).send(JSON.stringify(response.data, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error fetching book details" });
  }
});

module.exports.general = public_users;
