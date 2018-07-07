const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ 
  extended: true
}))

const routes = require('./routes/lowdb');

// get list of all food postings
app.get('/api/food', routes.listFood);

// post a new food post
app.post('/api/food', routes.createFood);

// // update a food posting
// app.put('/api/food/:id', routes.update);

// // retrieve user details 
// app.get('/api/user/:id', routes.listUser);

// cerate new user 
app.post('/api/user', routes.createUser);

app.listen(process.env.PORT, () => {
  console.log('App is listening to port ', process.env.PORT)
})