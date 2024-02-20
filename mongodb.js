const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/helpdesk")
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