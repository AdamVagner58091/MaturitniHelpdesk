const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://simvesely:xaghoc-fyscop-1neNki@cluster0.wg2ime2.mongodb.net/your-database-name", {
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