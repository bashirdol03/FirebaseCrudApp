


export const Movie = (props) => {

    

    return (

        <div>        
            <h1 style={{color: props.receivedAnOscar ? 'green': 'red'}}>{props.title}</h1>
            <p>Year:{props.releaseDate}</p>
            <button onClick={() => props.deleteMovie(props.id)  }>Delete Movie</button>
            <input placeholder='Update title...' type="text" onChange={e=> props.setUpdatedMovieTitle(e.target.value)}/>
            <button onClick={()=>props.updateMovie(props.id)}>Update Movie Title</button> 
         
        </div>
    )
}

  