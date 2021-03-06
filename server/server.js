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
    }, (err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("Database is connected");
        }
    })

}

connectDB();


//schema

const reminderSchema = new mongoose.Schema({
    reminderMsg: String,
    remindAt:String,
    isReminded:Boolean
})

const Reminder = new mongoose.model("reminder", reminderSchema);



// sending msg to whatsapp 

setInterval(() =>{
    Reminder.find({}, (err, reminderList) =>{
        if(err){
            console.log(err);
        }

        if(reminderList){
            reminderList.forEach(reminder =>{
                if(!reminder.isReminded){
                    const now = new Date()

                    if((new Date(reminder.remindAt) - now) < 0){
                        Reminder.findByIdAndUpdate(reminder._id, {
                            isReminded:true
                        },
                        (err, remindObj) =>{
                            if(err){
                                console.log(err);
                            }

                            // sending msg

                            const accountSid = process.env.ACCOUNT_SID; 
                            const authToken = process.env.AUTH_TOKEN; 
                            const client = require('twilio')(accountSid, authToken); 
                            
                            client.messages 
                                .create({ 
                                    body: reminder.reminderMsg, 
                                    from: process.env.FROM_NUM,       
                                    to: process.env.TO_NUM 
                                }) 
                                .then(message => console.log(message.sid)) 
                                .done();

                        }
                        )
                    }
                }
            })
        }
    })
},1000)





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
    const { reminderMsg, remindAt } = req.body

    const reminder = new Reminder({
        reminderMsg,
        remindAt,
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
    Reminder.deleteOne({_id:req.body.id}, () => {
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