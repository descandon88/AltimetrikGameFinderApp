
// function changeMode() {

//     var element = document.body;
//     element.classList.toggle("dark-mode");
//     // alert("Hello there!");
//     console.log("Haciendo click");

//  }

const doc=document.querySelector(".inputsContainer");
let userEmail = '';
// let initials = '';


const userValidation = async(event) =>{
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    const email = document.getElementById("email_id").value;
    const password = document.getElementById("password_id").value;
    // const email = document.getElementById("email_id").value;
    // const password = document.getElementById("password_id").value;
    try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {

    let userEmail = email;
    localStorage.setItem("userEmail", userEmail);

    console.log("Qué entrea al userEmail: ", userEmail);
    // setTimeout(() => {
    
    window.location.href = "../FinderSection/finder.html";
    // }, 2000); 

    } else {
      alert("Error in login session.");
    }
    return Promise.resolve({ userEmail: null });
    } catch (error) {
    console.error("Error of fetch request:", error);

    return Promise.resolve({ userEmail: null });
  }
}

// userValidation()
// .then((result) => {
//     const { userEmail } = result;
//     console.log("Valor actualizado de userEmail:", userEmail);
//     // Aquí puedes hacer lo que necesites con el valor actualizado de userEmail
//   });


doc?.addEventListener("submit", userValidation);



 const getInitials = (name) => {
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




export  {userEmail,getInitials};
// module.exports = {getInitials};