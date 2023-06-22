import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';
import BookState from './context/books/BookState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert,setAlert] = useState(null)
  const showAlert = (message,type,time)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },time)
  }
  return (
    <>
      <BookState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route element={<Home showAlert={showAlert}/>} path="/" />
              <Route element={<About />} path="/about" />
              <Route element={<Login showAlert={showAlert}/>} path="/login"/>
              <Route element={<Signup showAlert={showAlert}/>} path="/signup"/>
            </Routes>
          </div>
        </BrowserRouter>
      </BookState>
    </>
  );
}

export default App;
