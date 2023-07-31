/***FILTER FUNCTION FOR GAME LIST **/

export const filterGames=(games, searchGame)=> {
    // console.log("qué entra en el search game", searchGame)
      const filtergames = games.filter(game =>{ 
        if ( 
          game.name.toLowerCase().includes(searchGame)
  
        ) return true;
      
        else {
      
          return false;
        }
      }
      )

      if (searchGame !="" && filtergames.length >0 ) 
      {  
        return filtergames; 
      }
      // else if(searchGame===undefined)
      else
      { 
        return games
      }
  }

  // LIST IN SEARCH BAR
export const saveText=(event) =>{
    if (event.key === "Enter") {
      let inputValue = document.getElementById("searchbarId").value;
  
      if (inputValue.trim() !== "") {
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