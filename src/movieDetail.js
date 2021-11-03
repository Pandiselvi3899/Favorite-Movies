import React,{useEffect, useState} from 'react'
import {useParams } from 'react-router'
import {BackBtn} from './App'
import * as mui from '@mui/material'
import * as Icons from '@mui/icons-material';
import {Link} from 'react-router-dom'
import {Counter} from './App'
import TopIcon from '@mui/icons-material/KeyboardArrowUp';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Button = mui.Button
function MovieDetail({movies}) {
    const [show, setShow] = useState(false)
    const {movieId} = useParams()
    let idVal = movieId<= movies.length? [{...movies[movieId], id: movieId}] : [{id:"",name:"", poster:"",trailer:"", category:"", summary:"", releaseDate:"",rating:"", genre:"", counts:""}]
    
    const [movie, setMovie] = useState(idVal)

    useEffect(() => {    
        setMovie(idVal)
     }, [movieId])

    const [{id,name, poster,trailer, category, summary, releaseDate,rating,genre, counts}] = movie
     console.log(movieId<=movies.length)
    return (<div>
       {movieId <= movies.length ? <div id={id} className="App" >
       <h2 style={{margin: '1px', padding:'0px', textAlign:"left"}} ><BackBtn/></h2>
       {/* video   */}
       {/* <iframe width="100%" height = "400px"  src={`${trailer}?controls=1&autoplay=0`} title={`${name}'s Trailer'`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe> */}

   <div  key={id}>
     <h1 className="name">{name}</h1>
     <div  className="movieCon-in-detail "> 
       <div className="container">
       <Link className="App-link" to={`./${id}`}>
           <img src={poster} className="contentImg" alt={name} title={name} />
       </Link>
       
       </div> 
       
       <div className="content-in-detail "> 
          
         <Counter id={id} movies = {movies} stat={counts.status} likes = {counts.likes} dislikes = {counts.disLikes} />

         <p> <a href={`https:youtu.be/${trailer.split("/")[trailer.split("/").length-1]}`} className="App-link"> Watch Trailer  </a></p>
         <p> Category :  {category} </p>
         <p> Release Date : {releaseDate} </p>
         <p> Genre : {genre.join(", ")}</p>
         <p> Rating ⭐ : {rating} </p>
         {/* <details><summary> Description </summary> <p >{summary}</p></details>  */}
         <p> Description : {!show ? <span>{summary.substring(0, 50)}... 
         <Button 
         variant = "text"
         sx={{color:"#61dafb"}}
         onClick = {(e)=>setShow(true)}
         >
          <Icons.KeyboardArrowDown /> Read More</Button> </span> : <span>{summary} 
           <Button
           variant="text"
           color = "warning"
           onClick = {(e)=>setShow(false) }
           >
          <TopIcon/> Read Less</Button></span> } </p>
       </div>
       {/* <div  className="App-header-in-detail">
     {
      movies.map(({name, poster,category,summary,watchOn},id)=>(
       <div key={name}  id={id}  >
              <Accordion sx={{ backgroundColor: "transparent", color:"whitesmoke", border:"none", margin:"0px", boxShadow:"none"}}>
   <AccordionSummary 
       expandIcon={<ExpandMoreIcon sx={{color:"whitesmoke", margin:"0px"}} />}
   >
     <Typography sx={{ width: '100%', flexShrink: 0, border:"none",  }}>
         <div>
         <Link className="App-link" to ={`/movie/${id}/#${id}`}> 
         <div className="movieList-in-detail">
           <div className="posterCon-in-detail" >
            
           <img src={poster} className="poster-in-detail" alt={name} title={name} />
           
         </div>
         <div>
         <p>{name}</p>
         <p style={{color:"grey"}}>{category}</p>
         </div></div> </Link>
          </div>
       </Typography>
   </AccordionSummary>
   <AccordionDetails>
     <Typography>
      <div>
          {summary}
      </div>
     </Typography>
   </AccordionDetails>
 </Accordion>
         </div>
         
     ))}
   </div> */}
     </div>
   </div>

   </div>
: <div><p>ID not Found</p></div>
}</div>)
}

export default MovieDetail