
const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://simvesely:xaghoc-fyscop-1neNki@cluster0.wg2ime2.mongodb.net/helpdesk", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
    console.error("MongoDB connection failed: ", error.message);
});

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }

})

const collection=new mongoose.model("Collection1", LogInSchema)

module.exports=collection 

/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://simvesely:xaghoc-fyscop-1neNki@cluster0.wg2ime2.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/