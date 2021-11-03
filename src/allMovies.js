import React from 'react'
//import TopIcon from '@mui/icons-material/KeyboardArrowUp';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link} from 'react-router-dom';
import * as Icons from '@mui/icons-material'
import * as mui from '@mui/material'
import Button from '@mui/material/Button';
import './App.css';
import { Counter } from './App';
import {useHistory} from 'react-router'

function AllMovies({movies, setMovies}) {
    let history = useHistory()
    return (
        <div className="content">
            
     {
      movies.map(({name, poster,category,summary,rating, counts},id)=>(
       <div key={name}  id={id}  >
              <Accordion sx={{ backgroundColor: "transparent", color:"black", border:"none", margin:"0px", boxShadow:"none"}}>
                
   <AccordionSummary 
       expandIcon={<ExpandMoreIcon sx={{color:"whitesmoke", margin:"0px"}} />}
   >
     <Typography sx={{ width: '100%', flexShrink: 0, border:"none",  }}>
         <div><Link className="App-link" to ={`/movie/${id}/#${id}`}>
         <div className="movieList-in-detail"><div className="posterCon-in-detail" >             
           <img src={poster} className="poster-in-detail" alt={name} title={name} />                   
         </div>
         <div>
         <p>{name}    <mui.IconButton 
         className="content"
         onClick={()=> history.push("/movie/"+id)} 
         color="info"
        > <Icons.Info/> </mui.IconButton></p>
         <p style={{color:"grey"}}>{category}</p>
         </div>
         </div></Link>
        <Counter id={id} movies = {movies} stat={counts.status} likes = {counts.likes} dislikes = {counts.disLikes} /> 
         </div>
       </Typography>
   </AccordionSummary>
   <AccordionDetails>
     <Typography>
      <div>
        <p style={{color:"green"}}>Description :</p>
          <p>{summary}</p>
          
              <Button
              variant="text"
              color='error'
              onClick={(e)=>{
                e.preventDefault();
              console.log(movies.filter((data, index)=> index !== id))
              alert(` ${name} deleted`)
              setMovies(movies.filter((ele, index)=> id !== index))
              }}
              >
              <Icons.Delete/>  Delete
              </Button>

             <Link className="App-link"  to={`/edit/${id}`}><Button
              color="info"
              variant="text"
              >
               <Icons.Edit/> Edit 
              </Button></Link>
            
      </div>
     </Typography>
   </AccordionDetails>
 </Accordion>
         </div>
         
     ))}
   
        </div>
    )
}

export default AllMovies