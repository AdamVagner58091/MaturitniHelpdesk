const mongoose = require('mongoose');

// Update the connection string with your MongoDB Atlas credentials and database name
const atlasConnectionString = "mongodb+srv://simvesely:xaghoc-fyscop-1neNki@cluster0.wg2ime2.mongodb.net/helpdesk?retryWrites=true&w=majority";

mongoose.connect(atlasConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB Failed: ", error.message);
  });

const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Update the model name to match your collection in MongoDB Atlas
const collection = mongoose.model("collection1", LogInSchema);

module.exports = collection;

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
run().catch(console.dir);*/
