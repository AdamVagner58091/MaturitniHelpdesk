const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://simvesely:<password>@cluster0.wg2ime2.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("MongoDB connected")
})
.catch((error)=>{
    console.error("MongoDB Failed: ", error.message)
})

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