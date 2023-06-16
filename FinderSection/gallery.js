
const url = 'https://rawg-video-games-database.p.rapidapi.com/games?key=18890cd37d674530a577c605c7d378ff';

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
        const gameObject = await response.json();
    
        console.log(gameObject.results);
        // const gameList = gameObject.results;

        
        return gameObject
    } catch(error)  { 
            console.log(error);
        }


}

async function gameListFetchedData() {
    try {
      const listObj = await fetchApiGames();
      let  gameList = Object.values(listObj.results);
      console.log(gameList); 
      let containerCards = document.querySelector('.sectionGallery');
   
    //   let divMiddleCard = document.querySelector('div');
      gameList.forEach((obj) =>{
        const elementName=document.createElement('p');
        const elementReleased=document.createElement('p');
       
        elementName.style.color = "white";
        elementReleased.style.color = "white";


        const gameCard= document.createElement('div.gameCard');
        const middleSectionCard = document.createElement('div.middleSectionCard');



        elementName.textContent = `${obj.name}`; 
        elementReleased.textContent = `${obj.released}`; 
        middleSectionCard.append(elementName,elementReleased);
        // middleSectionCard.appendChild(elementReleased);

        gameCard.appendChild(middleSectionCard);

        containerCards.appendChild(gameCard);
        console.log(obj.name);
        console.log(obj.released);

      })
    // Utiliza los datos retornados desde la función fetchData
      return gameList
    } catch (error) {
      console.log(error);
    }
  }

  gameListFetchedData();
// fetchApiGames();
// const gameList2 = abc.results;

// console.log('Será esta lista',gameList2)





// fetch(url, options)
// .then(res=>{console.log(res.json());
// const objDucky =  res.json()})
// .then(objDucky=>{

// console.log(objDucky)
// })
// .catch(err => console.error(err));

const cardsSection = document.querySelector('.sectionGallery');


const loopGame=(games) => {
    Object.entries(games).foreach(([id,slug]) => {
    //   const div = document.createElement('div');
    //   const image = document.createElement('img');
    //   const name = document.createElement('h3');
    //   const species = document.createElement('h3');
    //   const like = document.createElement('button');
    console.log(id);
    console.log(slug);

}) 
};

// loopGame(fetchApiGames());


 




