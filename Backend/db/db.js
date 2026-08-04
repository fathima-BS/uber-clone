const mongoose=require('mongoose');

function connectDB(){
    mongoose.connect(process.env.DB_Connect).then(()=>{
        console.log('connected to DB');
    }).catch((err)=>{
        console.log(err);       
    })
}
module.exports=connectDB;