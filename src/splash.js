import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
function Splash() {
    return (
        <div className="splash" >
            <h1><Link to="/movies" className="link App-link" > <Button
            variant="text"
            className="link"
            >  Movies List</Button> </Link> </h1>

            <h1><Link to="/addMovie" className="link App-link" > <Button
            variant="text"
            className="link"
            > Add a Movie</Button> </Link> </h1>
        </div>
    )
}

export default Splash