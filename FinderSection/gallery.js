import { bigViewGameCard, multipleViewGameCard } from "./cards_composition.js";
const url = 'https://rawg-video-games-database.p.rapidapi.com/games?key=18890cd37d674530a577c605c7d378ff';
let searchbar = document.getElementById("searchbarId");
// let cardHTML = '' ;
let gameArray = [];

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9d2c1aff85msh0080bd1967cc6cbp1d5a4ejsn0c29e7fa25a7',
		'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
	}
};

// ASYNC FUNCTION TO CALL THE APIS FROM THE URL//
const  getApiGames = async ()=> { 
    try {
        const response  = await fetch(url, options);
        const gameObject = await response.json();
        // let games = Object.values(gameObject.results);
        gameArray = Object.values(gameObject.results);

        return gameArray;
        
        // return games
    } catch(error)  { 
      throw Error(`error:${error}`);
    }
}


//***FILTER FUNCTION FOR GAME LIST ***///

const filterGames=(games, searchTerm)=> {
  // let gamesArray=[];
  // const lowSearchTerm = searchTerm.toLowerCase();
    const filtergames = games.filter(game =>{ 
      if ( 
        game.name.toLowerCase().includes(searchTerm)

      ) return true;
    
      else {
    
        return false;
      }
    }
    )
    console.log("Filter games: ", filtergames.length);
    console.log(" games: ", games);

    if (searchTerm !="" && filtergames.length >0 ) 
    {  
      return filtergames 
    }
    else
    { 

      return games
    }
}

// LIST IN SEARCH BAR
const saveText=(event) =>{
  if (event.key === "Enter") {
    let inputValue = document.getElementById("searchbarId").value;
    // let inputValue = searchbar;

    if (inputValue.trim() !== "") {
      // Verificar si el valor ya existe en el localStorage antes de guardarlo
      let storedValues = localStorage.getItem("myValues");
      let values = storedValues ? JSON.parse(storedValues) : [];

      if (!values.includes(inputValue)) {
        values.push(inputValue);
        localStorage.setItem("myValues", JSON.stringify(values));
        updateDataList();
      }

      alert("Text saved in the localStorage.");
    } else {
      alert("Please, insert valid text");
    }
  }
}

// Función para actualizar la lista desplegable (datalist) con los valores almacenados en el localStorage
const updateDataList =()=> {
  let  dataList = document.getElementById("mySearchList");
  dataList.innerHTML = "";
  let storedValues = localStorage.getItem("myValues");
  if (storedValues) { 
   let values = JSON.parse(storedValues);
    values.forEach(function(value) {
      let option = document.createElement("option");
      option.value = value;
      dataList.appendChild(option);



    });

  }
}
window.addEventListener('load', function() {
  // Obtener el ancho del input
  let input = document.getElementById('searchbarId');
  let inputWidth = window.getComputedStyle(input).width;

  // Aplicar el mismo ancho al datalist
  let datalist = document.getElementById('mySearchList');
  datalist.style.width = inputWidth;
});

document.getElementById("searchbarId").addEventListener("keypress", saveText);
document.getElementById("searchbarId").addEventListener("keypress", updateDataList);

// updateDataList();

// CODE HERE TO CLEAR THE LOCAL STORGAE WHEN CHANGE THE LOGIN USER
// localStorage.clear();

//



// const multipleViewGameCard = (games) => {
//   console.log(games);
//   cardHTML = '';
//     cardHTML = games.map((element, index) => {
//       let key = index +1;
//       let namesGenres = element.genres.map((objInner)=>{return objInner.name});

//       cardHTML += '<div class="gameCard"> \
//       <div class="product-header"> \
//         <img src="'+element.background_image+'"/> \
//       </div> \
//       <div class="product-title"> \
//         <h4 class="gameName">'+element.name+'</h4> \
//         <h4 class="gameNumber">'+'#'+key+'</h4> \
//       </div> \
//       <div class="productContent"> \
//         <div class="productContentCol-1"> \
//         <div class="productLabels"> \
//         <p class="dateLabel"> '+'Release date:'+'</p> \
//         <p class="genresLabel"> '+'Genres:' +'</p> \
//       </div> \
//       <div class="productFeatures"> \
//        <p class="dateReleased"> '+element.released+'</p> \
//         <p class="genresList"> '+namesGenres+'</p> \
//        </div> \
//        </div> \
//        <div class="productContentCol-2"> \
//        </div> \
//       </div> \
//     </div> \
//     ';    
//     document.getElementsByClassName('sectionGallery')[0].innerHTML = cardHTML;

//   });

// }

//  const bigViewGameCard = (games) => {
//   console.log("hola que hace");
//   cardHTML = '';
//     cardHTML = games.map((element, index) => {
//       let key = index +1;
//       let namesGenres = element.genres.map((objInner)=>{return objInner.name});

//       cardHTML += '<div class="gameCard"> \
//       <div class="product-header"> \
//         <img src="'+element.background_image+'"/> \
//       </div> \
//       <div class="product-title-bigCards"> \
//         <h2 class="gameName">'+element.name+'</h2> \
//         <h2 class="gameNumber">'+'#'+key+'</h2> \
//       </div> \
//       <div class="productContent-bigCards"> \
//         <div class="productContentRow1-bigCards"> \
//           <div class="col1-bigCards-dates"> \
//             <p class="dateLabel-bigCards"> '+'Release date:'+'</p> \
//             <p class="dateReleased-bigCards"> '+element.released+'</p> \
//           </div> \
//         <div class="col2-bigCards-genres"> \
//           <p class="genresLabel-bigCards"> '+'Genres:' +'</p> \
//           <p class="genresList-bigCards"> '+namesGenres+'</p> \
//         </div> \
//         <div class="col3-bigCards-consoles"> \
//         </div> \
//        </div> \
//        <div class="productContentRow2-bigCards"> \
//        <p class="description-bigCards"> '+element.released+'</p> \
//        </div> \
//       </div> \
//     </div> \
//     ';    
//     document.getElementsByClassName('sectionGallery')[0].innerHTML = cardHTML;

//   });

// }

// function showList(searchTerm){
const showList = async(searchTerm)=>{
if (gameArray.length === 0) {
    try {
      gameArray = await getApiGames();
      console.log("Game array fetched: ", gameArray.length);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  }
  const filteredGames = filterGames(gameArray, searchTerm);
  multipleViewGameCard(filteredGames);
}

showList();

const showBigViewCards = async(searchTerm)=>{
  if (gameArray.length === 0) {
      try {
        gameArray = await getApiGames();
        console.log("Game array fetched: ", gameArray.length);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    }
    const filteredGames = filterGames(gameArray, searchTerm);
    bigViewGameCard(filteredGames);
  }

searchbar.addEventListener('keyup',  (e) => {
  let searchTerm = e.target.value;
  console.log("searchTerm: ",searchTerm);
  showList(searchTerm);
})


// VIEW BUTTONS

let cardContainer = document.querySelector('.sectionGallery');
let singleViewButton = document.querySelector('.singleView');
let gridViewButton = document.querySelector('.multipleView');


singleViewButton.addEventListener('click',()=> {
  cardContainer.classList.add('singleColumn');
  showBigViewCards();
});

gridViewButton.addEventListener('click', ()=>{
  cardContainer.classList.remove('singleColumn');  
  showList();
});

