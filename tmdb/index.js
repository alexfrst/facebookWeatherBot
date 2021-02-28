const axios = require("axios")
const extractEntity = (nlp , entity ) =>{
  if(entity in nlp.message.nlp.traits){
    console.log(nlp.message)
    if(nlp.message.nlp.traits[entity][0].confidence >0.8)
    {
      console.log(nlp.message.nlp.traits[entity])
      return nlp.message.nlp.traits[entity][0].value
    }
    else{
      return null
      console.log("confidence is too small")
    }
  }
  else
  {
    return null
  }
}

const getIntent = (nlp) =>{
  if(nlp.message.nlp.intents[0] && nlp.message.nlp.intents[0].confidence>0.8){
    return nlp.message.nlp.intents[0].name
  }else{
    return null
  }
}

const getMovieData = (movie , releaseYear = null ) => {
// filled by you
  return new Promise ( async ( resolve , reject ) => {
    try {

      let yearPayload = ""
      if(releaseYear != null){
        yearPayload = "&year="+releaseYear
      }
      console.log(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB}&language=en-US&query=${movie}&page=1&include_adult=false${yearPayload}`)
      const movieInfos = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB}&language=en-US&query=${movie}&page=1&include_adult=false${yearPayload}`,
          )
          resolve (movieInfos.data)
    }catch ( error ) {
        console.log(error)
    }
}) ;    
}

const getDirector = (movieID) => {
// filled by you
  return new Promise ( async ( resolve , reject ) => {
      try {
      const movieInfos = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${process.env.TMDB}&language=en-US`,
          )
          resolve (movieInfos.data)
           }catch ( error ) {
        console.log(error)
    }
}) ;    
}

const getImage = async (movieID) => {
  const data = await new Promise ( async ( resolve , reject ) => {
      try {
      const movieImage = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}/images?api_key=${process.env.TMDB}&language=en-US&include_image_language=en%2Cnull`,
          )
          resolve (movieImage.data)
           }catch ( error ) {
        console.log(error)
    }
}) ; 

  if(data.posters.length > 0){
    return `https://image.tmdb.org/t/p/w500/${data.posters[0].file_path}`
  }else{
    return "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgithub.com%2Fcockpit-project%2Fcockpit%2Fissues%2F8197&psig=AOvVaw16RVBRVKcGDMmB4-I6Jdci&ust=1614591198525000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLiri4ujjO8CFQAAAAAdAAAAABAI"
  }
}


const exportDirector = (movieInfo) => {
  for(elem of movieInfo){
    if(elem.job === "Director"){
      return elem.name
    }
  }
}

module.exports = nlpData => {
 return new Promise ( async function ( resolve , reject ) {
    let intent = getIntent(nlpData)
      console.log(intent)
    if( intent == 'movieinfo' ) {
      let movie = extractEntity ( nlpData ,'movie') ;
      console.log(movie)
      
      let releaseYear = extractEntity ( nlpData,'releaseYear') ;
      try {
        let movieData = await getMovieData (movie , releaseYear ) ;
        const imguri = await getImage(movieData.results[0].id); 
        resolve([movieData.results[0].overview,imguri]) ;
      }catch(error){
        console.log(error)
        reject(console.log(error));
      }
    }else if(intent == 'director'){
      let movie = extractEntity ( nlpData ,'movie') ;
      console.log(movie)
      let releaseYear = extractEntity ( nlpData,'releaseYear') ;
      try {
        const movieData = await getMovieData (movie , releaseYear ) ;
        const movieInfo = await getDirector(movieData.results[0].id);
        const director = exportDirector(movieInfo.crew)
        const imguri = await getImage(movieData.results[0].id); 
        resolve([director,imguri])
      }catch(error){
        console.log(error)
        reject(console.log(error));
      }
    }else{
  resolve ("Error occured") ;
  }
 })}


