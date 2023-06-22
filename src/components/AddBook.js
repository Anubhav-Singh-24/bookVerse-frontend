import React, { useContext, useState } from 'react';
import BooksContext from '../context/books/BooksContext';

const AddBook = (props) => {
  const context = useContext(BooksContext);
  const { addBook } = context;

  const [book, setBook] = useState({
    title: '',
    description: '',
    genre: '',
    author: '',
    status: '',
  });

  const submit = (e) => {
    e.preventDefault();
    addBook(book.title, book.author, book.genre, book.description, book.status);
    setBook({
      title: '',
      description: '',
      genre: '',
      status: '',
      author: '',
    });
    props.showAlert('Book Added Successfully!!', 'success', 1500);
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto my-3">
      <h2 className="text-2xl font-bold mb-3 text-indigo-600">Add a book to your collection!!</h2>
      <form className="my-3">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Book Title
          </label>
          <input
            type="text"
            className="form-input mt-1 block w-full border-gray-300 rounded-md py-1 px-1"
            id="title"
            name="title"
            placeholder="Title of the book"
            onChange={handleChange}
            minLength={5}
            required
            value={book.title}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700">
            Author
          </label>
          <input
            type="text"
            className="form-input mt-1 block w-full border-gray-300 rounded-md py-1 px-1"
            id="author"
            name="author"
            placeholder="Author of the book"
            onChange={handleChange}
            minLength={5}
            required
            value={book.author}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block text-gray-700">
            Genre
          </label>
          <input
            type="text"
            className="form-input mt-1 block w-full border-gray-300 rounded-md py-1 px-1"
            id="genre"
            name="genre"
            placeholder="Mystery/Thriller/Horror"
            onChange={handleChange}
            minLength={5}
            required
            value={book.genre}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            className="form-textarea mt-1 block w-full border-gray-300 rounded-md py-1 px-1"
            name="description"
            id="description"
            rows="3"
            onChange={handleChange}
            minLength={5}
            value={book.description}
            placeholder='Add some description'
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700">
            Status
          </label>
          <input
            type="text"
            className="form-input mt-1 block w-full border-gray-300 rounded-md py-1 px-1"
            id="status"
            name="status"
            placeholder="Read/Not read/Currently reading"
            onChange={handleChange}
            minLength={5}
            required
            value={book.status}
          />
        </div>
        <button
          disabled={
            book.title.length < 5 ||
            book.genre.length < 5 ||
            book.status.length < 4 ||
            book.author.length < 5
          }
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={submit}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBook;
