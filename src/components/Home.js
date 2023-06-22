import React from 'react'
import Books from './Books'


const Home = (props) => {
   
    return (
        <div>
           <Books showAlert={props.showAlert}/>
        </div>
    )
}

export default Home
