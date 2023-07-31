const doc=document.querySelector(".inputsContainer");
let userEmail = '';


const userValidation = async(event) =>{
    event.preventDefault(); 
    const email = document.getElementById("email_id").value;
    const password = document.getElementById("password_id").value;

    try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
    const data = await response.json();
    const userToken = data.token;
    let userEmail = email;
    // localStorage.setItem("userEmail", userEmail);
    localStorage.setItem('token',userToken);

    window.location.href = "../FinderSection/gamesGallery.html";

    } 
    else if (response.status === 401) {
      alert('user or password are incorrect! ')
    }
    else if (response.status === 404) {
      alert('Not found!')
    }
    else {
      alert("Password or User are not correct. Please try again!");
    }
    return Promise.resolve({ userEmail: null });
    } catch (error) {
    console.error("Error of fetch request:", error);

    return Promise.resolve({ userEmail: null });
  }
}



doc?.addEventListener("submit", userValidation);

export const logOutFunction = (tokenFromUserSension) => {
    // console.log("Se hace click en log Out Function ? ", userToken)
    localStorage.removeItem ("token", tokenFromUserSension);
    window.location.href = "../LoginScreenView/login.html";
}


export const getInitials = (name) => {
    const names = name.split(' ');
    let initials = '';
    // names.forEach((n) => (initials += n[0].toUpperCase()));
    names.forEach((n) => {
        if (n.length > 0) {
          initials += n[0].toUpperCase();
          if (n.length > 1) {
            initials += n[1].toUpperCase();
          }
        }
      });
    return initials;
  }




export default {getInitials,logOutFunction};
