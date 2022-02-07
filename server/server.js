require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


// configuration of App
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());



// configuration of Database

const connectDB = async () => { 
   await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }, () => console.log("Database Connected"))

}

connectDB();


//schema

const reminderSchema = new mongoose.Schema({
    reminderMsg: String,
    reminderAt:String,
    isReminded:Boolean
})

const Reminder = new mongoose.model("Reminder", reminderSchema);


// API Routes

app.get("/getAllReminder", (req, res) => {

})

app.post("/addReminder", (req, res) => {

})

app.post("/deleteReminder", (req, res) => {

})

app.get("/" , (req, res) =>{
    res.send("Response from Backend")
})

// listen and port 
const PORT = process.env.PORT || 9000;
app.listen( PORT, () => console.log(`server is running on port ${PORT}`))