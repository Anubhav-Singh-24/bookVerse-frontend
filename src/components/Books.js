import React, { useContext, useEffect, useRef, useState } from 'react'
import BooksContext from '../context/books/BooksContext'
import BookItem from './BookItem';
import AddBook from './AddBook';
import { useNavigate } from 'react-router-dom';

const Books = (props) => {
    const context = useContext(BooksContext);
    let navigate = useNavigate()
    const { books, fetchBook, editBook } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchBook();
        }else{
            navigate('/login')
        }
        // eslint-disable-next-line 
    }, [])

    const [book,setBook] = useState({id:"", etitle:"",edescription:"",egenre:"",eauthor:"",estatus:""})

    const updateBook = (currentBook) => {
        ref.current.click()
        setBook({
            id: currentBook._id,
            etitle: currentBook.title, 
            edescription: currentBook.description,
            egenre: currentBook.genre,
            eauthor: currentBook.author,
            estatus: currentBook.status
        })
    }
    
    const ref = useRef(null)
    const refClose = useRef(null)
    
    const submit = (e)=>{
        editBook(book.id,book.etitle,book.eauthor,book.edescription,book.egenre,book.estatus)
        props.showAlert("Updated Successfully!!",'success',1500)
        refClose.current.click();
    }

    const changes = (e)=>{
        setBook({...book,[e.target.name]: e.target.value})
    }

    return (
        <>
            <AddBook showAlert={props.showAlert}/>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="fs-5 text-2xl font-bold mb-3 text-indigo-600" id="exampleModalLabel">Edit information</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="" className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Book Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' placeholder="Title of the book" onChange={changes} value={book.etitle}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="author" className="form-label">Author</label>
                                    <input type="text" className="form-control" id="eauthor" name='eauthor' placeholder="Author of the book" onChange={changes} value={book.eauthor}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="genre" className="form-label">Genre</label>
                                    <input type="text" className="form-control" id="egenre" name='egenre' placeholder="Mystery/Thriller/Horror" onChange={changes} value={book.egenre}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" name='edescription' id="edescription" rows="3" onChange={changes}value={book.edescription}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <input type="text" className="form-control" id="estatus" name="estatus" placeholder="Read/Not read/Currently reading" onChange={changes} value={book.estatus}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded" onClick={submit}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2 className='text-2xl font-bold mb-3 text-indigo-600 my-2'>Your Collection</h2>
                <div className="container mx-3">
                    {books.length===0 && "Currently no books in your library. Add some"}
                </div>
                {books.map((book) => {
                    return <BookItem key={book._id} book={book} updateBook={updateBook} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}

export default Books
