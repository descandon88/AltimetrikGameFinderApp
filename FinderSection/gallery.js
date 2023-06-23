
const url = 'https://rawg-video-games-database.p.rapidapi.com/games?key=18890cd37d674530a577c605c7d378ff';
let searchbar = document.getElementById("searchbar");
let dataStore = [];

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9d2c1aff85msh0080bd1967cc6cbp1d5a4ejsn0c29e7fa25a7',
		'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
	}
};



async function fetchApiGames () { 
    try {
        const response  = await fetch(url, options);
       // const response  = await fetch(data);
        const gameObject = await response.json()
    
        console.log(gameObject.results);
        // const gameList = gameObject.results;
        // dataStore = gameObject.gameObject;
        // sectionGallery.innerHTML = getHTML(gameObject.gameObject);
        
        return gameObject
    } catch(error)  { 
            console.log(error);
        }


}
let cardHTML = '' ;

async function gameListFetchedData() {
    try {
      const listObj = await fetchApiGames();
      let  gameList = Object.values(listObj.results);
      console.log(gameList); 
    
    gameList.map((element, index) => {
      let key = index +1;
 
      namesGenres = element.genres.map((objInner)=>{console.log(objInner.name);return objInner.name})
       cardHTML += '<div class="gameCard"> \
      <div class="product-header"> \
        <img src="'+element.background_image+'"/> \
      </div> \
      <div class="product-title"> \
        <h4 class="gameName">'+element.name+'</h4> \
        <h4 class="gameNumber">'+'#'+key+'</h4> \
      </div> \
      <div class="productContent"> \
        <div class="productContentCol-1"> \
        <div class="productLabels"> \
        <p class="dateLabel"> '+'Release date:'+'</p> \
        <p class="genresLabel"> '+'Genres:' +'</p> \
      </div> \
      <div class="productFeatures"> \
       <p class="dateReleased"> '+element.released+'</p> \
        <p class="genresList"> '+namesGenres+'</p> \
       </div> \
       </div> \
       <div class="productContentCol-2"> \
       </div> \
      </div> \
    </div> \
    ';

    // console.log(element.name);
    // console.log(element.released);
 });
      
  document.getElementsByClassName('sectionGallery')[0].innerHTML = cardHTML;


    return gameList
    } catch (error) {
      console.log(error);
    }
  }

  gameListFetchedData();

  searchbar.addEventListener('Input', function(e){
    const currentword = e.target.value;
    return currentword
    // const filteredData= dataStore.filter(o => o.slug.includes(currentword));
    // sectionGallery.innerHTML = filteredData.length ? getHTML(filteredData) : noResultHTML();
});





const cardsSection = document.querySelector('.sectionGallery');






 




