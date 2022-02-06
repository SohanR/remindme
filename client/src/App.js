import React, { useState } from "react";
// import axios from"axios";
import DateTimePicker from "react-datetime-picker";
import './App.css';


function App() {

  const [reminderMsg, setReminderMsg] = useState("");
  const [ remindAt, setRemindAt ] = useState("");

  // add reminder function
  const addReminder = () => {
    return null;
  } 

  return (
    <div className="App">
      <div className="homepage">
        <div className="homepage_header">
          <h1>Remind Me</h1>
          <input type="text" placeholder="Reminder Notes Here... " value={reminderMsg} onChange={ e => setReminderMsg }  />
          <DateTimePicker 
            value={remindAt}
            onchange={ setRemindAt }
            minDate={ new Date() }
            minutePlaceholder="mm"
            hourPlaceholder="hh"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
          />

          <div className="button" onClick={addReminder} >
            Add Reminder        
          </div>
        </div>


        <div className="homepage_body">
            <div className="reminder_card">
              <h2>Reminder Note</h2>
              <h3>Remind Me at:</h3>
              <p>02/02/2022</p>
              <div className="button">Delete</div>
            </div>

            <div className="reminder_card">
              <h2>Reminder Note</h2>
              <h3>Remind Me at:</h3>
              <p>02/02/2022</p>
              <div className="button">Delete</div>
            </div>

            <div className="reminder_card">
              <h2>Reminder Note</h2>
              <h3>Remind Me at:</h3>
              <p>02/02/2022</p>
              <div className="button">Delete</div>
            </div>
          </div>
      </div>  
    </div>
  );
}

export default App;
