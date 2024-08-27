const express = require("express");
const mongoose = require("mongoose");

const {client} = require('../client');
module.exports = {client};

const app = express();

const messageRoutes = require('./routes/messageRoutes')

/**-------------------------CONNECTION A LA BD ATLAS---------------------------------------*/
mongoose.connect("mongodb+srv://user1:Hp8qIqjq3GmBPJAR@cluster0.vxwjvww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
/**---------------------------------------------------------------------------------------*/

/**-----------------PRISE DES REQUETES & ENVOI DE LEUR BODY A 'req'-----------------------*/
app.use(express.json());
/**---------------------------------------------------------------------------------------*/

/*--------------------------ACCESS CORS--------------------------------------------------*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
/**------------------------------------------------------------------------------------- */

/**-------------------------RETRANSMISSION DES ROUTES--------------------------------- ---*/
app.use('/api-client', messageRoutes) ;
/**------------------------------------------------------------------------------------- */

module.exports = app;
