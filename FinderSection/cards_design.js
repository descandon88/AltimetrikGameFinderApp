let cardHTML = '' ;

export const multipleViewGameCard = (games) => {
    // console.log('qué entra a multiple View ?',games);
    cardHTML = '';
      cardHTML = games.map((element, index) => {
        let key = index +1;
        let namesGenres = element.genres.map((objInner)=>{return objInner.name});
  
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
      document.getElementsByClassName('sectionGallery')[0].innerHTML = cardHTML;
  
    });
  
  }

export const bigViewGameCard = (games) => {
    cardHTML = '';
      const gameCardsBigView = games.map((element, index) => {
        let key = index +1;
        let namesGenres = element.genres.map((objInner)=>{return objInner.name});
  
        return '<div class="gameCard"> \
        <div class="product-header"> \
          <img src="'+element.background_image+'"/> \
        </div> \
        <div class="product-title bigCards"> \
          <h2 class="gameName">'+element.name+'</h2> \
          <h2 class="gameNumber">'+'#'+key+'</h2> \
        </div> \
        <div class="productContent bigCards"> \
          <div class="productContentRow1-bigCards"> \
            <div class="col1-bigCards-dates"> \
              <p class="dateLabel-bigCards"> '+'Release date:'+'</p> \
              <p class="dateReleased-bigCards"> '+element.released+'</p> \
            </div> \
          <div class="col2-bigCards-genres"> \
            <p class="genresLabel-bigCards"> '+'Genres:' +'</p> \
            <p class="genresList-bigCards"> '+namesGenres+'</p> \
          </div> \
          <div class="col3-bigCards-consoles"> \
          </div> \
         </div> \
         <div class="productContentRow2-bigCards"> \
         <p class="description-bigCards"> '+element.description+'</p> \
         </div> \
        </div> \
      </div> \
      ';     
  
    });
    document.getElementsByClassName('sectionGallery')[0].innerHTML = gameCardsBigView.join('');

  }

export default {bigViewGameCard, multipleViewGameCard};