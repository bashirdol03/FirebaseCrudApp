import {Auth} from './components/auth'
import {Movie} from './components/Movie'
import {db, auth} from './config/firebase'
import {useState, useEffect} from 'react'
import {getDocs,
        collection, 
        addDoc, 
        deleteDoc, 
        updateDoc,
        doc} from 'firebase/firestore'

function App() {

  const [moviesList, setMoviesList] = useState([])
  const [movieTitle, setMovieTitle] = useState("")
  const [movieReleaseDate, setMovieReleaseDate] = useState(0)
  const [hasWonOscar, setHasWonOscar] = useState(true)
  const [dbUpdate, setDbUpdate] = useState(false)
  const [updatedMovieTitle, setUpdatedMovieTitle] = useState("")


  
  const moviesCollectionRef = collection(db, "movies")


  useEffect(()=>{

      const getMoviesList = async () => {
        try {
         const data = await getDocs(moviesCollectionRef)  
         const filteredData = data.docs.map( doc => (
            {
              ...doc.data(),
              id: doc.id
            }
          )) 
         setMoviesList(filteredData)
        } catch (err) {
          console.error(err)
        }
   }

   getMoviesList()

   
  },[dbUpdate])


  const deleteMovie = async(id) => {
    console.log('deleting')
    const movieId = doc(db, "movies", id)
    await deleteDoc(movieId)
    setDbUpdate(prevVal => !prevVal)  
  }

  const updateMovie = async(id) => {
    console.log('updating')
    const movieId = doc(db, "movies", id)
    await updateDoc(movieId, {title: updatedMovieTitle})
    setDbUpdate(prevVal => !prevVal)  
  }

  const log = () => {
    console.log('function working')
  }

  const onSubmit = async () => {
    try{
         await addDoc(moviesCollectionRef, {
          title: movieTitle,
          releaseDate: movieReleaseDate,
          receivedAnOscar: hasWonOscar,
          userId: auth?.currentUser?.uid
         } )
        }catch(err){
        console.error(err) 
        }  
     
   setDbUpdate(prevVal => !prevVal)   

  }

  const movieElements = moviesList.map(movie => (
    <Movie key={movie.id} 
    id={movie.id}
    title={movie.title} 
    receivedAnOscar={movie.receivedAnOscar} 
    releaseDate={movie.movieReleaseDate}
    deleteMovie={deleteMovie}
    updateMovie={updateMovie}
    setUpdatedMovieTitle={setUpdatedMovieTitle}
    log={log}
    
    />
  )) 

  
  return (
    <div className="App">
     <Auth/>
     <div>
        <input placeholder='Movie Title...' onChange={ e => setMovieTitle(e.target.value)}/>
        <input placeholder='Movie Release Date...' type="number" onChange={ e => setMovieReleaseDate(Number(e.target.value))} />
        <input type="checkbox" id="oscar" checked={hasWonOscar} onChange={e => setHasWonOscar(e.target.checked)}/>
        <label htmlFor="oscar">Received an oscar</label>
        <button onClick={onSubmit}>Submit Movie</button>
       

     </div>

     {movieElements}   
    </div>

  )
}

export default App
