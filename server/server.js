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
    Reminder.find( {}, ( err, reminderList ) =>{
        if ( err ){
            console.log(err);
        }

        if( reminderList ){
            res.send(reminderList)
        }
    } )
})

app.post("/addReminder", (req, res) => {
    const { reminderMsg, reminderAt } = req.body

    const reminder = new Reminder({
        reminderMsg,
        reminderAt,
        isReminded:false
    })
    reminder.save( err => {
        if ( err ){
            console.log(err);
        }
        
        Reminder.find( {}, ( err, reminderList ) =>{
            if ( err ){
                console.log(err);
            }
    
            if( reminderList ){
                res.send(reminderList)
            }
        } )

    })
})

app.post("/deleteReminder", (req, res) => {
    reminder.deleOne({_id:req.body.id}, () => {
        Reminder.find( {}, ( err, reminderList ) =>{
            if ( err ){
                console.log(err);
            }
    
            if( reminderList ){
                res.send(reminderList)
            }
        })
    })
})

// app.get("/" , (req, res) =>{
//     res.send("Response from Backend")
// })

// listen and port 
const PORT = process.env.PORT || 9000;
app.listen( PORT, () => console.log(`server is running on port ${PORT}`))