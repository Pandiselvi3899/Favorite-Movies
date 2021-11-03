import React,{useState} from 'react'
import * as mui from '@mui/material'
//import TopIcon from '@mui/icons-material/KeyboardArrowUp';


const Button = mui.Button , TextField = mui.TextField ;

function AddMovie(props) { 
       const [movies, setMovies] = [props.movies, props.setMovies]
        const [formData, setFormData] = useState({
          name : '',
          poster: '',
          summary: '',
          id :movies.length ,
          category :'',
          genre :[''],
          releaseDate :'',
          rating:'',
          trailer :'',
          counts :{likes:0, disLikes:0}
        })
      
      
      //form handlers
      
      const handleMovieName = (e)=> {
        e.preventDefault();
        setFormData({...formData,name: e.target.value})
        }
      
      const handlePoster =(e)=> {
        e.preventDefault()
        setFormData( {...formData, poster: e.target.value})
        }  
      
      const handleSummary = (e)=> {
        e.preventDefault()
        setFormData( {...formData, summary: e.target.value})}
        
        const handleTrailer = (e)=> {
            e.preventDefault()
            setFormData( {...formData, trailer: e.target.value})}
      
      const handleSubmit = (e) => {
      e.preventDefault();
        setMovies([...movies, formData]);
      
        setFormData({
          name : '',
          poster: '',
          summary: '',
          id :movies.length ,
          category :'',
          genre :[''],
          releaseDate :'',
          rating:'',
          trailer :'',
          counts :{likes:0, disLikes:0}
        })
      }           
        return(<div id="newMovie">       
         <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">           
           <div className="card-header bg-transparent border-0 text-center text-uppercase">
             <h3>Add Movie</h3></div>
           <div className="card-body">
    
        <TextField 
          label="Movie Name" 
          variant="outlined" 
          value = {formData.name}
          type="text" 
          margin="normal"
          className="inputs"
          name="Movie name" 
          id="MovieName" 
          placeholder = 'Movie Name' 
          onChange={handleMovieName}
          required/>
                    
          <TextField 
          label="Poster Link" 
          variant="outlined" 
          type="url"
           className="inputs" 
          margin="normal"
          name="poster" 
          id="poster" 
          placeholder="Poster" 
          value = {formData.poster} 
          onChange={handlePoster}
          required />

        <TextField 
          label="Trailer Link" 
          variant="outlined" 
          type="url"
          className="inputs" 
          margin="normal"
          name="trailer" 
          id="trailer" 
          placeholder="Trailer" 
          value = {formData.trailer} 
          onChange={handleTrailer}
          required />
      
          <TextField 
          label="Summary" 
          variant="outlined" 
           className="inputs"
          rows={4}
          margin="normal"
          multiline
          value = {formData.summary} 
          name="summary" 
          id="summary" 
          placeholder="summary" 
          onChange={handleSummary} />
        </div>        
      
     
          <Button 
          margin="normal"
          variant="outlined"
          type = 'submit'  
          onClick={handleSubmit}      
           >Submit</Button>
            </div>
        </div>)
      }
      

export default AddMovie