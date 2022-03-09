const express = require ('express');
const { MongoClient, ServerApiVersion  } = require('mongodb');
const cors = require ('cors')
const ObjectId = require("mongodb").ObjectId;


const app = express();

const port = process.env.PORT || 5000;

// WdrMnCSslW9WjoZe
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://rjibon49:WdrMnCSslW9WjoZe@cluster0.ggbuo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
      await client.connect();
  
      const database = client.db("fwfadb");
      const storeProgramCollection = database.collection("programs");
    
       
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

    // PROGRAM DELETE API 
    app.delete("/program/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await storeProgramCollection.deleteOne(query);
        res.json(result);
      });
     
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