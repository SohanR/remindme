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
   
  } 

  // delete reminder
  const deleteReminder = () =>{

  }

  return (
    
    <div className="App">
{console.log(reminderList)}
     
      <div className="homepage">
       
        <div className="homepage_header">
          <h1>Remind Me</h1>
          <input type="text" placeholder="Reminder Notes Here... " value={reminderMsg} onChange={ e => setReminderMsg(e.target.value) }  />
          <DateTimePicker onChange={setRemindAt} value={remindAt} hourPlaceholder="hh" 
          dayPlaceholder="DD" 
          yearPlaceholder="YYYY" 
          monthPlaceholder="MM" 
          minutePlaceholder="mm" />

          <div className="button" onClick={addReminder} >
            Add Reminder        
          </div>
        </div>

        <div className="homepage_body">
            <div className="reminder_card">
              <h2>Reminder Note</h2>
              <h3>Remind Me at:</h3>
              <p>02/02/2022</p>
              <div className="button" onClick={deleteReminder} >Delete</div>
            </div>
          </div>
      </div>  
    </div>

  );
}

export default App;
