import { bigViewGameCard, multipleViewGameCard } from "./cards_design.js";
import {filterGames, saveText} from "./searchBar.js";
import { modalDesign, openModalLogOut, closeModalLogOut  } from "./modal.js";
import { getInitials, logOutFunction } from "../LoginScreenView/js/login.js";
const userEmail = localStorage.getItem("userEmail");
const userToken = localStorage.getItem("token");
let gameObj = [];
let gameArray2 = [];

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

// little console.log to confirm if the token have been passed
if( userToken ) {console.log('token ingresado:', userToken);
}

const logOutBtn = document.querySelector(".logOutLink");
logOutBtn.addEventListener('click',()=>{
  openModalLogOut();  
});

const logOutBtnRoute = document.querySelector("#logoutBtnYes");
logOutBtnRoute.addEventListener('click',()=>{
   const userToken = localStorage.getItem('token');
  if(userToken) { 
  logOutFunction(userToken)
  }
});
const logOutBtnNo = document.querySelector("#logOutBtnNo");
const logOutBtnClose = document.querySelector(".close-logOut");


logOutBtnNo.addEventListener('click',()=>{
  closeModalLogOut();
});
logOutBtnClose.addEventListener('click',()=>{
  closeModalLogOut();
});



// Call getInitials function 
const initials = getInitials(userEmail);
console.log('email/user initials:', initials);
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
    // console.log("Order2: ", finalResults);
    return finalResults;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Function to update the localStorage of the games searched (datalist)
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
 
  let input = document.getElementById('searchbarId');
  let inputWidth = window.getComputedStyle(input).width;

  let datalist = document.getElementById('mySearchList');
  datalist.style.width = inputWidth;
});

document.getElementById("searchbarId").addEventListener("keypress", saveText);
document.getElementById("searchbarId").addEventListener("keypress", updateDataList);

// updateDataList();

// CODE HERE TO CLEAR THE LOCAL STORGAE WHEN CHANGE THE LOGIN USER
// localStorage.clear();







const showList = async(searchTerm)=>{
if (gameArray.length === 0) {
    try {
      gameObj = await getApiGames();
      // gameArray2=  await getGameDescription(gameArray, apiKey);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  } 
  let filteredGames = filterGames(gameObj, searchTerm);

  // if (filteredGames !=0) { 
    multipleViewGameCard(filteredGames);
    modalClick(modalDesign)
  // }
  // else {
  //   console.log("Game Not Exist!");
  //   // alert("Game Not Exist!");

  // }
}



  const executeObjectDetailed =  ()=>{


    return new Promise ((resolve)=>{
      setTimeout(async()=>{
        gameArray2 =  await getGameDescription(gameArray, apiKey);
      resolve(gameArray2);
      // console.log("Se termina  el exceuteArrayDetailed");

    },1600);
    });

  };
  // showList();

  // executeObjectDetailed();
// Execute async functions since the begining...
  showList()
  .then(() => executeObjectDetailed())
  .then(()=>modalClick(modalDesign))
  .then(() => {
    console.log("All functions initial have been executed");
  })
  .catch((error) => {
    console.error("Error", error);
  });

// ASYNC FUNCTION FOR BIG VIEW CARDS  

const showBigViewCards = async (searchTerm)=>{
  // console.log("Cuánto hay aquí gameArray",gameArray);

  if (gameArray2.length == 0 ) {
    
      try {
        gameArray2 =  await getGameDescription(gameArray, apiKey);
        // console.log("Game array2 fetched: ", gameArray2.length);
      } catch (error) {
        console.error('Error fetching games:', error);
      }

    }
  let filteredGames = filterGames(gameArray2, searchTerm);
  bigViewGameCard(filteredGames);
  modalClick(modalDesign)
   
}


let isTrue = false; 

const setTrue = () => {
  isTrue = true;
  // console.log('isTrue:',isTrue);

  // console.log('Estado cambiado a true', isTrue);
  searchbar.addEventListener('keyup',  (e) => {
    let searchTerm = e.target.value;
    // console.log("searchTerm: ",searchTerm);
    showBigViewCards(searchTerm);
  })
};

const setFalse = () => {
  isTrue = false;
  // console.log('Estado cambiado a false',isTrue);
  searchbar.addEventListener('keyup',  (e) => {
    let searchTerm = e.target.value;
    // console.log("searchTerm: ",searchTerm);
    showList(searchTerm);
});
}

if (setFalse) { 
  searchbar.addEventListener('keyup',  (e) => {
    let searchTerm = e.target.value;
    // console.log("searchTerm: ",searchTerm);
    showList(searchTerm);
  })
} else if(setTrue) {
  searchbar.addEventListener('keyup',  (e) => {
    let searchTerm = e.target.value;
    // console.log("searchTerm: ",searchTerm);
    showBigViewCards(searchTerm);
  })
}


// GETTING ELEMENTS AS BUTTONS AND CONTAINERS

const svgSingleView = document.getElementById('singleViewIcon');
const svgMultipleView = document.getElementById('multipleViewIcon');

let cardContainer = document.querySelector('.sectionGallery');
// const sectionGallery = document.getElementById('sectionGallery');

let singleViewButton = document.querySelector('.singleView');
let gridViewButton = document.querySelector('.multipleView');

const modal = document.querySelector('.modal');
const modalContent = document.getElementById('modal-Content');
// let  closeBtn = '';


const modalClick = (modalDesignFn)=> {  
  // console.log("funciona el click modal");
 const btnCard = document.querySelectorAll(".gameCard");

  btnCard.forEach((card) => {
    const container = card;
    let gameName ='';
    container.addEventListener('click', (event)=> {
      const targetcard = event.target;
      gameName = card.querySelector('.gameName').textContent;
   if (targetcard.matches('img')||targetcard.matches('h4')||targetcard.matches('div')||targetcard.matches('p')||targetcard.matches('h2')) {
      modal.style.display = 'block';
      let modalHTML = '';

      modalDesignFn(gameName,gameArray2,modal,modalHTML); 
      }
      else {
        console.log("matches don't get in");

      }
    });
    
  });
} 

const changeSVGColor = (svgId, color) => {
  const svgIcon = document.getElementById(svgId);
  svgIcon.setAttribute('fill', color);
};



singleViewButton.addEventListener('click',()=> {
  setTrue();
  cardContainer.classList.add('singleColumn');

  const currentColor = svgSingleView.getAttribute('fill');

  if (currentColor === '#707070') {
    changeSVGColor('singleViewIcon', '#FFFDF5');
    changeSVGColor('multipleViewIcon', '#707070');
  } 

  showBigViewCards(searchbar.value);
  modalClick(modalDesign)

});


gridViewButton.addEventListener('click',()=>{
  setFalse();
  cardContainer.classList.remove('singleColumn');  

  const currentColor = svgMultipleView.getAttribute('fill');
  if (currentColor === '#707070') {
    changeSVGColor('singleViewIcon', '#707070');
    changeSVGColor('multipleViewIcon', '#FFFDF5');

  } 


  showList(searchbar.value)
  modalClick(modalDesign)
 
});


