const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dbConnection = async() =>{

    try {
        await mongoose.connect(process.env.DB_CONN);
        console.log('MongoDB connection established');
    } catch (error) {
        throw new Error('Error connecting to MongoDB');
    }
    

}

module.exports = {
    dbConnection
}
