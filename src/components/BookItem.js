import React, { useContext, useState } from 'react'
import BooksContext from '../context/books/BooksContext'

const BookItem = (props) => {
    const context = useContext(BooksContext);
    const {deleteBook} = context;
    const { book, updateBook } = props;

    const [isThover,setThover] = useState(false)
    const [isPhover,setPhover] = useState(false)

    const handleTEnter = () => {
        setThover(true);
      };
    
      const handleTLeave = () => {
        setThover(false);
      };

    const handlePEnter = () => {
        setPhover(true);
      };
    
      const handlePLeave = () => {
        setPhover(false);
      };

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="max-w-md w-full px-6 py-4 bg-white shadow-md shadow-indigo-300 hover:shadow-indigo-500 rounded-lg overflow-hidden">
                    <h5 className="text-center text-lg font-bold mb-4 text-indigo-500">{book.title}</h5>
                    <h6 className="font-semibold my-1">Author:- {book.author}</h6>
                    <h6 className="font-semibold my-1">Genre:- {book.genre}</h6>
                    <p className='card-text'>{book.description}</p>
                    <h6 className="font-semibold my-1">Status:- {book.status}</h6>
                    <div className="btns">
                        <i className={`fa-solid fa-trash mx-2 my-2 ${isThover ? 'fa-bounce' : ''}`} onMouseEnter={handleTEnter} onMouseLeave={handleTLeave} onClick={()=>{deleteBook(book._id);props.showAlert("Deleted Successfully","success",1500);} }></i>
                        <i className={`fa-solid fa-pen-to-square mx-2 my-2 ${isPhover ? 'fa-bounce' : ''}`} onMouseEnter={handlePEnter} onMouseLeave={handlePLeave} onClick={()=>{updateBook(book)}}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookItem
