const express = require('express');
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const expressHbs = require('express-handlebars');
const path = require('path');
const jwt = require('jsonwebtoken')
const crypt = require('bcrypt')
app.use(express.urlencoded({ extended: false }))

app.engine('hbs', expressHbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'hbs');
app.set('views', 'views');


//  J'AI RELIER a hbs grace a render j'ai afficher le formulaire 
// app.get("/auth/login" , (req, res) => {
//   async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();

//   }
//   res.render("login")
// })


// Créer la route /hotels qui retournera tous les hôtels (GET /hotels
const hotels = ['Hilton', 'Ritz', 'Trianon Palace']
app.get('/hotels', (req, res) => {
  res.send(hotels)
})

app.get('/hotels/:id', (req, res) => {
  const index = req.params.id
  res.status(500).json(hotels[index])
})

app.post('/hotels', (req, res) => {
  const hotel = req.body.name
  hotels.push(hotel)
  res.json(hotel)
})


// async avec await 
app.put('/hotels/:id', async (req, res) => {
  if (req.query.name) {
    hotels[req.params.id - 1] = req.query.name
    res.status(200).json({
      message: "Hotel updated",
      hotels: hotels
    })
  } else {
    res.status(500).json({
      message: "You have to provide a name for the hotel you wanna update"
    })
  }




})




mongoose.connect('mongodb://localhost:27017/trippyHotels', (error) => {
  if (error) {
    console.error(error);
    // Process exit permet de quitter l'application 
    process.exit(1)
  }
  console.log('Mongo DB est bien connecté');
});


app.listen(port, () => {
  console.log('Votre port 4000 est connecté');
})