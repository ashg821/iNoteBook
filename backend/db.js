const mongoose = require("mongoose");

//connecting to the local dababase hosted by mongod command
const connectToMongo = () => {
    main().catch(err => { console.log(err) })
    async function main() {
        mongoose.connect('mongodb://localhost:27017/mydb', () => {
            console.log("Connected to Mongo successfully.");
        });
    }
}
module.exports=connectToMongo;