let gameCardmodal = '';
// export let modalHTML = '';

export const modalDesign = (gameCardClicked, gameArray, modalObj, modalHTML ) => {
  // let modalHTML = '';
  console.log("que llega a la función:",gameCardClicked );

    const selectedGame = gameArray.find((game) => game.name === gameCardClicked);

    // console.log("que llega a la gameArray dentro de modal design:",selectedGame );


    modalHTML+= '<div class="gameCard-modal"  style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), black 70%),url(\'' + selectedGame.background_image + '\'); background-size: contain;   border-radius: 14px; height:100%; width:100%;">\
    <div class="modal-header"> \
      <div class="modal-close"><p class="close">&times;</p></div>\
      <div class="modal-title"><h1>'+selectedGame.name+'</h1></div>\
      <div class="modal-tags">\
        <div class="modal-released"><p>'+selectedGame.released+'</p></div>\
        <div class="modal-top-tag"><p>'+selectedGame.rating_top+'</p></div>\
      </div>\
      </div> \
      <div class="modal-main"> \
        <div class="modal-main col1"> \
          <div class="modal-main description">'+selectedGame.description+' </div>\
          <div class="modal-main buttons">\
            <button class="addWhishListBtn">Add to wishlist</button>\
            <button class="purchaseBtn">Purchase</button>\
          </div>\
          <div class="modal-features">\
          <div class="modal-features col1">\
          <p>Platforms</p>\
          <p class="modal-features text">Release date</p>\
          <p>Publisher</p>\
          <p>Website</p>\
          </div>\
          <div class="modal-features col2">\
          <p>Genre</p>\
          <p>Developer</p>\
          <p>Age rating</p>\
          </div>\
          </div>\
        </div> \
        <div class="modal-main col2"> \
        </div> \
      </div> \
      </div> \
    ';     

  // });
   document.getElementsByClassName('modal-content')[0].innerHTML = modalHTML;

  return new Promise((resolve)=>{
    // let modal = document.querySelector('.modal');

    let closeBtn = document.querySelector('.close');
    let  gameCardModal = document.querySelector('.gameCard-modal');

    closeBtn.addEventListener('click',()=>{
      gameCardModal.remove();

      modalObj.style.display ='none';

      resolve(closeBtn);

    });
    
  });
  

};


gameCardmodal = document.querySelector(".gameCard-modal");

let closeBtn = document.querySelector('.close');


if (closeBtn){ 
  let closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', ()=> {
      // console.log("se hace click en el closeBtn o no? ");
   modal.style.display = 'none';
 });
 }

 export const closeModalLogOut=()=>{
  document.querySelector('.modal-logOut').style.display='none';
 }
 export const openModalLogOut=()=>{
  document.querySelector('.modal-logOut').style.display='block';
 }

 export default {modalDesign,closeModalLogOut,openModalLogOut };