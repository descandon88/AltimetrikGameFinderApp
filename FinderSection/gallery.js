import { bigViewGameCard, multipleViewGameCard } from "./cards_design.js";
import {filterGames, saveText} from "./searchBar.js";
import { modalDesign  } from "./modal.js";
import { getInitials, logOutFunction } from "../LoginScreenView/js/login.js";
const userEmail = localStorage.getItem("userEmail");
const userToken = localStorage.getItem("token");


// import {getAllGameDataV} from "./request.js";
const apiKey = '18890cd37d674530a577c605c7d378ff';

const url = `https://rawg-video-games-database.p.rapidapi.com/games?key=${apiKey}&platforms=18,1,7`;

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
// if( userEmail) {console.log('Email ingresado:', userEmail);
// }
if( userToken ) {console.log('token ingresado:', userToken);
}

const logOutlink = document.querySelector(".logOutLink");
logOutlink.addEventListener('click',()=>{

  const userToken = localStorage.getItem('token');
  if(userToken) { 
  logOutFunction(userToken)
  }
});


// Llama a la función getInitials utilizando el email guardado
const initials = getInitials(userEmail);
console.log('Iniciales del email:', initials);
document.getElementById('userInitials').textContent  = initials;


// ASYNC FUNCTION TO CALL THE APIS FROM THE URL//
const  getApiGames = async ()=> { 
    try {
        const response  = await fetch(url, options);
        const gameObject = await response.json();
        gameArray = Object.values(gameObject.results);

        return gameArray;
        
        // return games
    } catch(error)  { 
      throw Error(`error:${error}`);
    }
}


const getGameDescription = async (games, apiKey) => {
  const gamePromises = games.map(async (game, index) => {
    const gameId = game.id;
    const url = `https://rawg-video-games-database.p.rapidapi.com/games/${gameId}?key=${apiKey}`;

    try {
      const response = await fetch(url, options);
      const gameResult = await response.json();
      return { index, result: gameResult };
    } catch (error) {
      console.error(error);
      return { index, result: null };
    }
  });

  try {
    const gameDetail = await Promise.all(gamePromises);
    const orderedResults = gameDetail.sort((a, b) => a.index - b.index);
    const finalResults = orderedResults.map(result => result.result);
    console.log("Order2: ", finalResults);
    return finalResults;
  } catch (error) {
    console.log(error);
    return [];
  }
};

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
window.addEventListener('load', ()=> {
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



// function showList(searchTerm){
let gameObj = [];
let gameArray2 = [];



const showList = async(searchTerm)=>{
if (gameArray.length === 0) {
    try {
      gameObj = await getApiGames();
      // gameArray2=  await getGameDescription(gameArray, apiKey);

      console.log("Game array del show List: ", gameObj.length);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  }
  console.log("Game array del show List: ", gameObj.length);
 
  let filteredGames = filterGames(gameObj, searchTerm);
  multipleViewGameCard(filteredGames);

}

showList();


// const executeArrayDetailed = async ()=>{
  const executeArrayDetailed =  ()=>{
  // if (gameArray.length === 0) { 
    // showList();

    console.log("Se inicia el exceuteArrayDetailed");
    // await delay(1600);
    // gameArray2 =  await getGameDescription(gameArray, apiKey);

    return new Promise ((resolve)=>{
      setTimeout(async()=>{
        gameArray2 =  await getGameDescription(gameArray, apiKey);
      resolve(gameArray2);
      console.log("qu[e hay aqui",gameArray2[1]);

      console.log("Se termina  el exceuteArrayDetailed");

    },1600);
    });

  };

  executeArrayDetailed();

const showBigViewCards = async (searchTerm)=>{
  console.log("Cuánto hay aquí gameArray",gameArray);

  if (gameArray2.length == 0 ) {
    
      try {
        gameArray2 =  await getGameDescription(gameArray, apiKey);
        console.log("Game array2 fetched: ", gameArray2.length);
      } catch (error) {
        console.error('Error fetching games:', error);
      }

    }
  let filteredGames = filterGames(gameArray2, searchTerm);
  bigViewGameCard(filteredGames);
    
}


let isTrue = false; 

const setTrue = () => {
  isTrue = true;
  console.log('isTrue:',isTrue);

  console.log('Estado cambiado a true', isTrue);
  searchbar.addEventListener('keyup',  (e) => {
    let searchTerm = e.target.value;
    console.log("searchTerm: ",searchTerm);
    showBigViewCards(searchTerm);
  })
};

const setFalse = () => {
  isTrue = false;
  console.log('Estado cambiado a false',isTrue);
  searchbar.addEventListener('keyup',  (e) => {
    let searchTerm = e.target.value;
    console.log("searchTerm: ",searchTerm);
    showList(searchTerm);
});
}

if (isTrue == false) { 
  // showList()
  // showBigViewCards();

  console.log('isTrue:',isTrue);
  searchbar.addEventListener('keyup',  (e) => {
    let searchTerm = e.target.value;
    console.log("searchTerm: ",searchTerm);
    showList(searchTerm);
  })
// }
// else {
//   // searchTerm = e.target.value;
//   console.log('isTrue:', isTrue);

//   showBigViewCards(searchTerm);
//   searchbar.addEventListener('keyup',  () => {
//     // searchTerm = e.target.value;

//     console.log("searchTerm: ",searchTerm);
//     showBigViewCards(searchTerm);
//   })
}


// VIEW BUTTONS

let cardContainer = document.querySelector('.sectionGallery');
const sectionGallery = document.getElementById('sectionGallery');

let singleViewButton = document.querySelector('.singleView');
let gridViewButton = document.querySelector('.multipleView');

const modal = document.querySelector('.modal');
const modalContent = document.getElementById('modal-Content');
let  closeBtn = '';
// if (modalHTML){ 
//  let closeBtn = document.querySelector('.close');
//  closeBtn.addEventListener('click', ()=> {
//   console.log("se hace click en el closeBtn o no? ");
//   modal.style.display = 'none';
// });
// }
// let  btnCard;

// setTimeout(()=>{ 
const modalClick = (modalDesignFn)=> {  
  console.log("funciona el click");
 const btnCard = document.querySelectorAll(".gameCard");
  // console.log("gameCard btnCard",  btnCard);
  // console.log("gameArray2:",gameArray2);
  btnCard.forEach((card) => {
    const container = card;
    // console.log("card",card);
    let gameName ='';
    container.addEventListener('click', (event)=> {
      const targetcard = event.target;
   

      console.log("click", targetcard);
      gameName = card.querySelector('.gameName').textContent;

      console.log("gameName", gameName);
      // const selectedGame = gameArray2.find((game) => game.nombre === gameName);



   if (targetcard.matches('img')||targetcard.matches('h4')||targetcard.matches('div')||targetcard.matches('p')||targetcard.matches('h2')) {
    // if (selectedGame) {
      console.log("click matches");
      modal.style.display = 'block';
      let modalHTML = '';

      modalDesignFn(gameName,gameArray2,modal,modalHTML); 
      }
      else {
        console.log("no entra el matches");
        // modal.style.display = 'block';

      }
    });
    
  });
} 
// modalClick();
// },1700);
setTimeout(()=>{ 
  modalClick(modalDesign);
},3000);

// setTimeout(()=>{ 
//   btnCard.forEach((card) => {
//     card.addEventListener('click', (event)=> {
//       const targetcard = event.target;
//       console.log("click");

//       if (targetcard.matches('.gameCard')) {
  
//         modal.style.display = 'block';
//       }
//     });
//   });
// },1700);
//Cerrar el modal al hacer clic en el botón de cerrar


// function showModal(item) {
//   modalBody.textContent = item.description;
//   modal.style.display = 'block';
// }


singleViewButton.addEventListener('click',()=> {

  cardContainer.classList.add('singleColumn');
  showBigViewCards(searchbar.value);
    modalClick();

  isTrue = true; 
  setTrue()
});

gridViewButton.addEventListener('click',()=>{
  // setFalse

  cardContainer.classList.remove('singleColumn');  
  showList(searchbar.value)
  modalClick();
 

  // showList();
  setFalse();
  // isTrue = false; 

});


