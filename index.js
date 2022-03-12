const express = require ('express');
const { MongoClient, ServerApiVersion  } = require('mongodb');
const cors = require ('cors')
const ObjectId = require("mongodb").ObjectId;

require("dotenv").config();


const app = express();

const port = process.env.PORT || 5000;

// WdrMnCSslW9WjoZe
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ggbuo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
      await client.connect();
  
      const database = client.db("fwfadb");



    // ========================================================================
    // =======================  Data Collection Name ==========================
    // ========================================================================



    const storeProgramCollection = database.collection("programs");
    const storeArticleCollection = database.collection("articles");
    const storeEventCollection = database.collection("events");
    const storeCareerCollection = database.collection("career");




    // ========================================================================
    // =======================   Article DataStore  Start =====================
    // ========================================================================


    // ARTICLE GET API 

    app.get('/article', async(req, res) => {
      const cursor = storeArticleCollection.find({});
      const article = await cursor.toArray();
      res.send(article);
  })

  // ARTICLE POST API 
      app.post('/article', async(req, res) => {
          const newArticle = req.body;
          const result = await storeArticleCollection.insertOne(newArticle);
          console.log(result);
          res.json(result);
      })

  // ARTICLE UPDATE API 
     app.put('/article', async (req, res) => {
       const id = req.params.id;
       const updateArticle = req.body;
       const filter = {_id: ObjectId(id)};
       const options = { upsert: true};
       const updateDoc = {
         $set : {
           programName: updateArticle.programName,
           image: updateArticle.image,
           programDecription: updateArticle.programDescription
         },
       };
       const result = await storeArticleCollection.updateOne(filter,updateDoc, options)
       res.json(result)
     }) 

  // ARTICLE DELETE API 
  app.delete("/article/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await storeArticleCollection.deleteOne(query);
      res.json(result);
    });
  
  // ========================================================================
  // =======================   Article DataStore  End =======================
  // ========================================================================


    // ========================================================================
    // =======================   Event DataStore  Start =====================
    // ========================================================================


    // EVENT GET API 

    app.get('/event', async(req, res) => {
      const cursor = storeArticleCollection.find({});
      const event = await cursor.toArray();
      res.send(event);
  })

  // EVENT POST API 
      app.post('/event', async(req, res) => {
          const newEvent = req.body;
          const result = await storeArticleCollection.insertOne(newEvent);
          console.log(result);
          res.json(result);
      })

  // EVENT UPDATE API 
     app.put('/event', async (req, res) => {
       const id = req.params.id;
       const updateEvent = req.body;
       const filter = {_id: ObjectId(id)};
       const options = { upsert: true};
       const updateDoc = {
         $set : {
           programName: updateEvent.programName,
           image: updateEvent.image,
           programDecription: updateEvent.programDescription
         },
       };
       const result = await storeArticleCollection.updateOne(filter,updateDoc, options)
       res.json(result)
     }) 

  // EVENT DELETE API 
  app.delete("/event/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await storeArticleCollection.deleteOne(query);
      res.json(result);
    });
  
  // ========================================================================
  // =======================   Event DataStore  End =======================
  // ========================================================================


    // ========================================================================
    // =======================   Career DataStore  Start =====================
    // ========================================================================


    // CAREER GET API 

    app.get('/career', async(req, res) => {
      const cursor = storeCareerCollection.find({});
      const career = await cursor.toArray();
      res.send(career);
  })

  // CAREER POST API 
      app.post('/career', async(req, res) => {
          const newCareer = req.body;
          const result = await storeCareerCollection.insertOne(newCareer);
          console.log(result);
          res.json(result);
      })

  // CAREER UPDATE API 
     app.put('/career', async (req, res) => {
       const id = req.params.id;
       const updateCareer = req.body;
       const filter = {_id: ObjectId(id)};
       const options = { upsert: true};
       const updateDoc = {
         $set : {
           EventName: updateCareer.EventName,
           date: updateCareer.date,
           image: updateCareer.image,
           undefined: updateCareer.undefined
         },
       };
       const result = await storeCareerCollection.updateOne(filter,updateDoc, options)
       res.json(result)
     }) 

  // CAREER DELETE API 
  app.delete("/career/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await storeCareerCollection.deleteOne(query);
      res.json(result);
    });
  
  // ========================================================================
  // =======================   Career DataStore  End =======================
  // ========================================================================



    // ========================================================================
    // =======================   Program DataStore  Start =====================
    // ========================================================================

    
    // PROGRAM GET API 

    app.get('/program', async(req, res) => {
        const cursor = storeProgramCollection.find({});
        const program = await cursor.toArray();
        res.send(program);
    })

    // PROGRAM POST API 
        app.post('/program', async(req, res) => {
            const newProgram = req.body;
            const result = await storeProgramCollection.insertOne(newProgram);
            console.log(result);
            res.json(result);
        })

    // PROGRAM UPDATE API 
       app.put('/program', async (req, res) => {
         const id = req.params.id;
         const updateProgram = req.body;
         const query = {_id: ObjectId(id)};
         const options = { upsert: true};
         const updateDoc = {
           $set : {
             programName: updateProgram.programName,
             image: updateProgram.image,
             programDecription: updateProgram.programDescription
           },
         };
         const result = await storeProgramCollection.updateOne(query, updateDoc, options)
         res.json(result)
       }) 

    // PROGRAM DELETE API 
    app.delete("/program/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await storeProgramCollection.deleteOne(query);
        res.json(result);
      });
    
    // ========================================================================
    // =======================   Program DataStore  End =======================
    // ========================================================================






     
    } finally {
      //await client.close();
    }
  }
  
  run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("hello server")
})

app.listen(port, () => {
    console.log("Server Running port", port);
})