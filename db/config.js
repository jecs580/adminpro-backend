const mongoose = require('mongoose');
require('dotenv').config();
const dbConecction =  async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/adminprodb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false 
    });
    console.log('DB Online');
    } catch (error) {
       console.log(error);
       throw new Error('Error a la hora  de iniciar la DB ver logs');
    }
}
module.exports ={
    dbConecction
}