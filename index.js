
const express = require('express');
const bodyParser = require('body-parser');

const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
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

  app.get('/products', (req, res) =>{
    collection.find({})
    .toArray( (err, documents) =>{
      res.send(documents);
    })
  })


  // insert data 
  app.post('/addProduct', (req, res) =>{
    const product = req.body;
    collection.insertOne(product);
    res.send('success');
    console.log('data added to database')
  })


  // load data info
  app.get('/product/:id', (req, res) =>{
    collection.find({_id: ObjectId(req.params.id)})
    .toArray( (err, documents) =>{
      res.send(documents[0]);
    })
  })


  //update data
  app.patch('/update/:id', (req, res) =>{
    collection.updateOne({_id: ObjectId(req.params.id)},
    {
      $set: {price: req.body.price, quantity: req.body.quantity}
    })
    .then(result =>{
      console.log(result)
    })
  })

  

  // delete data 
  app.delete('/delete/:id', (req, res) =>{
    console.log(req.params.id)
    collection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result =>{
      console.log('item deleted successfully')
    })
  })
  
});


app.listen( 3000, () =>{
    console.log('App is running on port:3000')
})