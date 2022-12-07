
const express = require('express');
const bodyParser = require('body-parser');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://webDevNur:Cfs3NocoPff6TFYZ@cluster0.bsyqjya.mongodb.net/simpleProduct?retryWrites=true&w=majority&ssl=true";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
});

client.connect(err => {
  const collection = client.db("simpleProduct").collection("products");

  app.post('/addProduct', (req, res) =>{

    const product = req.body;
    console.log(product)
  })
  
});


app.listen( 3000, () =>{
    console.log('App is running on port:3000')
})