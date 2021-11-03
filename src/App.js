import React, {useState} from 'react'
import './App.css';
import movieData from './movies.json' 
import * as mui from '@mui/material'
//import AddIcon from '@mui/icons-material/Add';
import TopIcon from '@mui/icons-material/KeyboardArrowUp';
import * as Icons from '@mui/icons-material';
import { Route, Switch, useHistory } from 'react-router'
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import AddMovie from './addMovie';
import EditMovie from './editMovie';
import AllMovies from './allMovies';
import MovieDetail from './movieDetail';
import NotExists from './notExists';

const Button = mui.Button;

var temp = ['1'] 
function App(){
  const [movies, setMovies] = useState(movieData)
console.log(movies)

  return(
  <div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light"  bg="dark" >
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      <Link to={"/"} className="nav-link">
         Home
      </Link>
        </li>
      <li class="nav-item">
      <Link to={"/movies/all"} className="nav-link">
         All Movies
      </Link>       
      </li>  
      <li class="nav-item">
      <Link to={"/movie/add"} className="nav-link">
         Add Movie
      </Link>       
      </li>                          
    </ul>
  </div>
</nav>
    <Switch>
      <Route exact path = '/' children={<MovieList movies={movies} setMovies={setMovies}  />}></Route>        
      <Route exact path = '/movies/all'>
        <AllMovies movies = {movies} setMovies={setMovies} />
      </Route>
        <Route exact path = '/movie/add'>
        <AddMovie movies = {movies} setMovies={setMovies} />
      </Route>
      <Route exact path='/movie/:movieId' >
        <MovieDetail movies = {movies} />
      </Route>
      <Route exact path = '/edit/:editId'>
        <EditMovie movies = {movies} setMovies = {setMovies} />
      </Route>
      <Route path="**" >
       <NotExists />
      </Route>
    </Switch>
</div>)
}


function MovieList({movies, setMovies}) {

const [show, setShow] = useState(false)
const [movie, setMovie] = useState([{...movies[0], id: 0}])
let history = useHistory()

var HMovieList = []
let listNo = movies.length > 8 ? 5 : 2
for(let i = 0; i < listNo; i++){
  HMovieList.push(movies[i])
}

   
 //ad movie (temperary)

  return (
    <div id="movieList" style={{textAlign: 'center',color: 'black'}}>
      <h1>My Movies</h1>
      
      <div className="App">
        <div className="App-header">
          {         
           HMovieList.map(({name,poster},id)=>(      
            <div key={name} id={id} className="movieList">
              <div className="posterCon" >
                <button style={{padding:"0", border: 'none'}} onClick = {()=>updateById({id , movie, setMovie, movies})}>  
                <img src={poster} className="poster" alt={name} title={name} />
                </button> 
              </div>
              <p className="name">{name}</p>
            </div>
          ))}

          <div className="movieList" style={{alignItems:'center'}}>
            <mui.IconButton
            onClick={()=>history.push('/movies/all')}
            sx={{height:"100px", width:"100px"}}
            color='info'
            >
              <Icons.ArrowForwardIos/>
            </mui.IconButton>
            see all
          </div>
        </div>
      </div>
      

      {/* showing Movie details */}
     {movie === null? <div><h3>Select a Movie to show Details </h3></div> :  <div>
        {
        movie.map(({id,name, poster,trailer, category, summary, releaseDate,rating, genre, counts})=>(
        <div key={id}>
          <h1 className="name">{name}</h1>
          <div  className="movieCon">          
            <div className="container">
            <Link className="App-link" to={`/movie/${id}`}>
                <img src={poster} className="contentImg" alt={name} title="Click to watch Trailer" /> </Link>            
            </div>             
            <div className="content">          
              <Counter id={id} movies = {movies} stat={counts.status} likes = {counts.likes} dislikes = {counts.disLikes} />            
              <p> <Link className="App-link" to={"/movie/"+id} > <Icons.Info/> </Link></p>
              <p> category :  {category} </p>
              <p> Release Date : {releaseDate} </p>
              <p> Genre : {genre.join(", ")}</p>
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
              <Button
              variant="text"
              color='error'
              onClick={(e)=>{
                e.preventDefault();
              console.log(movies.filter((data, index)=> index !== id))
              alert(` ${name} deleted`)
              setMovies(movies.filter((ele, index)=> id !== index))
              setMovie(null)

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
          </div>
        </div>
      ))}
      </div>}
      
    </div>
  );
}


// update movie by id

export const updateById = ({id, movie, setMovie, movies}) =>{
console.log(id)
  temp[1] = temp[0] 
  temp[0] = id
  setMovie([{...movies[id], id: id}])
}

// Like and Dislike button
export const Counter = ({likes, dislikes, id, movies, stat}) =>{
  const [like, setLike] = useState(likes);
  const [disLike, setDisLike]= useState(dislikes);
  const [status, setStatus] = useState(stat); 
  
const LikeCount = () => {
  document.getElementById('likeBtn').disabled = true
  setStatus('liked')
  setLike(like + 1)
  status === 'disliked'? setDisLike(disLike-1) : setDisLike(disLike)
  movies[id-1]={...movies[id-1], counts :{likes: like+1, disLikes : status === 'disliked'? disLike-1 : disLike , status: 'liked'}}
  console.log(movies[id-1].counts)
}

const DisLikeCount = () =>{
  document.getElementById('disLikeBtn').disabled = true
  setStatus('disliked')
  setDisLike(disLike + 1)
  status ==='liked'? setLike(like-1) : setLike(like)
  movies[id-1]={...movies[id-1], counts :{likes: status === 'liked'? like-1 : like, disLikes : disLike+1, status: 'disliked'}}
  console.log(movies[id-1].counts)
}

  return <div>
  {/* 
  state - current scenario - current data
   */}
    <mui.IconButton 
    style={{fontSize:"30px"}}
    onClick={LikeCount}
    disabled={status === 'liked' ? true : false}
    id="likeBtn" >
    <mui.Badge 
    badgeContent={like} 
    color="primary"
    anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}>
    {status === 'liked' ? <Icons.ThumbUp /> : <Icons.ThumbUpOffAlt />}  
    </mui.Badge> 
    </mui.IconButton>
    
    <mui.IconButton 
    style={{fontSize:"30px"}}
    onClick={DisLikeCount}
    id="disLikeBtn" 
    disabled={status === 'disliked'? true : false}> 
    <mui.Badge 
    badgeContent={disLike} 
    color="error"
    anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}
    >
    { status === 'disliked' ? <Icons.ThumbDown /> :<Icons.ThumbDownOffAlt /> } 
    </mui.Badge> </mui.IconButton>
  
  </div>
}

export const BackBtn = () =>{
  let history = useHistory()
  return <mui.IconButton onClick={()=>history.goBack()} ><Icons.ArrowBackIos/> </mui.IconButton> }

export const HomeBtn = () =>{
  let history = useHistory()
  return <mui.IconButton onClick={()=>history.push('/')} ><Icons.Home/> </mui.IconButton> }  

export default App;