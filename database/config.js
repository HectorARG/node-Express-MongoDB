const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const dbConnection = async() =>{

    try {
        await mongoose.connect('mongodb+srv://angular:developer957467A@cluster0.1yasbxy.mongodb.net/test');
        console.log('MongoDB connection established');
    } catch (error) {
        throw new Error('Error connecting to MongoDB');
    }
    

}

module.exports = {
    dbConnection
}
