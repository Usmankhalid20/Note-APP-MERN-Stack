const mongoose = require('mongoose');
const dotenv = require('dotenv');

const DBconnect = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION)
        console.log("MongoDB is connected ..");
    } catch (error) {
        console.error("Not connected ... ", error);
    }
}
module.exports = DBconnect;