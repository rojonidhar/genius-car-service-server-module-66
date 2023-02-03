const express = require("express");
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hg6pi6j.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){

try{
await client.connect();
const serviceCollection = client.db('foodExpress').collection('service');


// To load all the form database
app.get('/service',async(req,res)=>{
 const query ={};
const cursor = serviceCollection.find(query);
const services = await cursor.toArray();
res.send(services);
});


// To load single data form the database
app.get('/service/:id',async(req,res)=>{
    const id = req.params.id;
    const query ={_id: new ObjectId(id)};
    const service=await serviceCollection.findOne(query);
    res.send(service);
})

// POST to add data on the database
app.post('/service',async(req,res) =>{
    const newService = req.body;
    const result = await serviceCollection.insertOne(newService);
    res.send(result);
})

// for delete item
app.delete('/service/:id',async(req,res)=>{
    const id = req.params.id;
    const query ={_id: new ObjectId(id)};
    const result = await serviceCollection.deleteOne(query);
    res.send(result)
})


}
finally{

}

}

run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('Running genius server')
})

app.listen(port,()=>{
    console.log('Lisening to port',port)
})