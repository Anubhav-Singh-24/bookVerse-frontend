import { useState } from "react";
import BookContext from "./BooksContext";

const BookState = (props) => {
  const host = "https://bookverse-kvr6.onrender.com";
  const booksInitial = []

  const [books, setBook] = useState(booksInitial)

  // Fetching a book
  const fetchBook = async () => {
    // API Call
    const response = await fetch(`${host}/api/books/fetchallbooks`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    })
    const jsonres = await response.json()
    setBook(jsonres);
  }

  // Adding a book
  const addBook = async (title, author, genre, description, status) => {
    // API Call
    const response = await fetch(`${host}/api/books/addbook`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, author, genre, description, status })
    })
    const jsonres = await response.json()
    setBook(books.concat(jsonres))
  }

  // Editing a book
  const editBook = async (id, title, author, description, genre, status) => {
    // API Call
    const response = await fetch(`${host}/api/books/updatebook/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, status, author, description, genre })
    })
    const jsonres = await response.json()
    console.log(jsonres)

    let newBook = JSON.parse(JSON.stringify(books))

    for (let i = 0; i < books.length; i++) {
      const element = newBook[i];
      if (element._id === id) {
        if(title) newBook[i].title = title;
        if(status) newBook[i].status = status;
        if(author) newBook[i].author = author;
        if(genre) newBook[i].genre = genre;
        if(description) newBook[i].description = description;
        break;
      }
    }
    setBook(newBook)
  }

  // Deleteing a book
  const deleteBook = async(id) => {
    const response = await fetch(`${host}/api/books/deletebook/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    })

    const jsonres = await response.json()
    console.log(jsonres)
    const newBooks = books.filter((book) => { return book._id !== id })
    setBook(newBooks)
  }

  return (
    <BookContext.Provider value={{ books, addBook, editBook, deleteBook, fetchBook }}>
      {props.children}
    </BookContext.Provider>
  )
}

export default BookState;