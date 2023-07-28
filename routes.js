const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
// const jsonServer = require('json-server');
// const auth = require('json-server-auth');

const fs = require('fs');
const app = express();
const port = 3000;
const secretKey = 'secret_key'; 

const db_file = 'db.json';


// app.use(express.static(path.join(__dirname, 'client')));
// const server = jsonServer.create();
// const router = jsonServer.router(db_file);
// const middlewares = jsonServer.defaults();

// server.db = router.db;


app.use(express.json());

app.use(cors());


// app.use('/users', middlewares);
// app.use('/users', auth);
// app.use('/login', middlewares);
// app.use('/login', auth);

app.get('/users',(req,res)=>{
    const usersData = fs.readFileSync(db_file, 'utf8');
    const users = JSON.parse(usersData).users;
  
    // Enviar todos los usuarios en la respuesta
    return res.json(users); 
})

app.post('/users', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // Read the existing users data from db.json
  const usersData = fs.readFileSync(db_file, 'utf8');
  const users = JSON.parse(usersData).users;

  // Check if the user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists.' });
  }

  // Encrypt the password
  const salt = bcrypt.genSaltSync(10);
  const encryptedPassword = bcrypt.hashSync(password, salt);

  // Create a new user object with encrypted password
  const newUser = {
    id: users.length + 1,
    email: email,
    password: encryptedPassword,
  };


//   newUser.token = token;

  // Add the new user to the users array
  users.push(newUser);

  // Save the updated users array back to db.json with the token
  fs.writeFileSync(db_file, JSON.stringify({ users }), 'utf8');

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, secretKey);


  return res.json({ newUser, token });
});


app.post('/login', (req, res) => {

    console.log('POST /login');
    const { email, password } = req.body;

    console.log('email', email);


    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }


  
    // Read the existing users data from db.json
    const usersData = fs.readFileSync(db_file, 'utf8');
    const users = JSON.parse(usersData).users;
  
    // Find the user by email
    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
  
    // Compare the provided password with the stored encrypted password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
  
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password.' });
    }
  
    // If the password is valid, generate a new JWT token and send it in the response
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey);
  
    return res.json({ user, token });
    // return res.redirect('/FinderSection/finder.html');
  });



app.listen(port, () => {
  console.log(`Routes is running on http://localhost:${port}`);
});
