const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
  //write code to check is the username is valid
  return !users.some(user => user.username === username);
}

const authenticatedUser = (username, password) => { //returns boolean
  //write code to check if username and password match the one we have in records.
  return users.some(user => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  // Task 7: Complete the code for logging in as a registered user. Hint: The code must validate and sign in a customer based on the username and password created in Exercise 6. It must also save the user credentials for the session as a JWT. Use the endpoint as "customer/login"
  const username = req.body.username;
  const password = req.body.password;

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, username
    }
    return res.status(200).json({ message: "User successfully logged in" });
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  // Task 8: Complete the code for adding or modifying a book review. Hint: You have to give a review as a request query & it must get posted with the username (stored in the session) posted. If the same user posts a different review on the same ISBN, it should modify the existing review. If another user logs in and posts a review on the same ISBN, it will get added as a different review under the same ISBN.
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization.username;
  if (books[isbn]) {
    if (books[isbn].reviews[username]) {
      books[isbn].reviews[username] = review;
      return res.status(200).json({ message: "Review successfully updated" });
    } else {
      books[isbn].reviews[username] = review;
      return res.status(200).json({ message: "Review successfully added" });
    }
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  // Task 9: Complete the code for deleting a book review under regd_users.delete("/auth/review/:isbn", (req, res) => { Hint: Filter & delete the reviews based on the session username, so that a user can delete only his/her reviews and not other users.
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;
  if (books[isbn] && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({ message: "Review successfully deleted" });
  } else {
    return res.status(404).json({ message: "Review not found" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
