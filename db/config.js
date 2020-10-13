const mongoose = require('mongoose');
require('dotenv').config();
const dbConecction =  async()=>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.drimc.mongodb.net/test`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
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