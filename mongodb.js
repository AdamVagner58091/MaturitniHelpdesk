const mongoose = require('mongoose');

const atlasConnectionString = "mongodb+srv://simvesely:Mongo123@cluster0.wg2ime2.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(atlasConnectionString, {
  useNewUrlParser: true,
  //useUnifiedTopology: true
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

const collection = mongoose.model("collection1", LogInSchema);

module.exports = collection;