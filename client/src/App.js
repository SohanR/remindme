import axios from "axios";
import { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import './App.css';


function App() {

  const [reminderMsg, setReminderMsg] = useState("");
  const [ remindAt, setRemindAt ] = useState("");
  const [ reminderList, setReminderList ] = useState([]);
 // const [value, onChange] = useState("");



  useEffect(() => {
    axios.get("http://localhost:9002/getAllReminder")
    .then( res => {
      setReminderList(res.data)
    })
  }, [])

  // add reminder function
  const addReminder = () => {
   axios.post("http://localhost:9002/addReminder", { reminderMsg, remindAt })
   .then(res => setReminderList(res.data))
   setReminderMsg("")
   setRemindAt("")
  } 

  // delete reminder
  const deleteReminder = (id) =>{
    axios.post("http://localhost:9002/deleteReminder", { id })
    .then( res => setReminderList(res.data))
  }

  return (
    
    <div className="App">

     
      <div className="homepage">
       
        <div className="homepage_header">
          <h1>Remind Me</h1>
          <input type="text" placeholder="Reminder Notes Here... " value={reminderMsg} onChange={ e => setReminderMsg(e.target.value) }  />
          <DateTimePicker onChange={setRemindAt} value={remindAt} hourPlaceholder="hh" 
          dayPlaceholder="DD" 
          yearPlaceholder="YYYY" 
          monthPlaceholder="MM" 
          minutePlaceholder="mm"
          required="true" />

          <div className="button" onClick={addReminder} >
            Add Reminder        
          </div>
        </div>

        <div className="homepage_body">
          {
            reminderList.map(reminder => (
              <div className="reminder_card" key={reminder._id} >
              <h2>{ reminder.reminderMsg }</h2>
              <h3>Remind Me at:</h3>
              {console.log(reminder)}
              
              <p>
                {String(new Date(reminder.remindAt.toLocaleString(undefined, {
                    timeZone:"Asia/Dhaka"
                  })))}
              </p>

              <div className="button" onClick={() => deleteReminder(reminder._id)} >Delete</div>
            </div>
            ))
          }

          </div>
      </div>  
    </div>

  );
}

export default App;
