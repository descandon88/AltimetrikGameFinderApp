//***FILTER FUNCTION FOR GAME LIST ***///

export const filterGames=(games, searchTerm)=> {
    // let gamesArray=[];
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
export const saveText=(event) =>{
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


  export default {filterGames, saveText};