import React, { useState } from 'react';
import {app} from "./firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";

interface WriteProps {
  location: string; // Define the prop type for location
  onSave: (title: string, body: string, date: string, time: string) => void; // Function to handle save
  onBack: () => void; // Function to handle back action
}

const Write: React.FC<WriteProps> = ({ location, onSave, onBack }) => {
  const [inputValue1, setInputValue1] = useState(""); // State for Title
  const [inputValue2, setInputValue2] = useState(""); // State for Body
  const [inputValue3, setInputValue3] = useState(""); // State for Body
  const [inputValue4, setInputValue4] = useState(""); // State for Body

  const saveData = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "appSpace/messages"));
    set(newDocRef, {
      Title: inputValue1,
      Message: inputValue2,
      Date: inputValue3,
      Time: inputValue4,
      Location: location,
    })
      .then(() => {
        alert("Data saved successfully");
        onSave(inputValue1, inputValue2, inputValue3, inputValue4); // Trigger onSave after saving
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  return (
    <div className="absolute w-full h-full bg-pinkk z-30">
      {/* Notes Input */}
      <div className="relative bg-pinkk w-full h-screen mt-10">
        <div className="flex flex-col h-screen">
          <div className="flex flex-row justify-between px-5 py-2">
            {/* Back button */}
            <img
              src="/back.svg"
              alt="Back"
              onClick={onBack} // Trigger onBack when clicked
              className="cursor-pointer"
            />
            {/* Save icon, trigger saveData when clicked */}
            <img
              src="/save.svg"
              alt="Save"
              onClick={saveData} // Trigger saveData function to save the message
              className="cursor-pointer"
            />
          </div>
          <div className="p-4">
            <textarea
              placeholder="Title"
              value={inputValue1}
              onChange={(e) => setInputValue1(e.target.value)}
              maxLength={10}
              className="w-full h-18 mt-5 bg-transparent border-none text-pinkk-300 text-5xl placeholder-pinkk-300 placeholder:text-5xl placeholder:font-medium resize-none focus:outline-none"
            />
            <textarea
              placeholder="Type something..."
              value={inputValue2}
              onChange={(e) => setInputValue2(e.target.value)}
              className="w-full h-10 bg-transparent mt-5 border-none text-pinkk-300 text-2xl placeholder-pinkk-300 placeholder:text-2xl placeholder:font-normal resize-none focus:outline-none"
            />
            {location === "Calendar" && (
              <div className="flex flex-col">
                <p  className="w-full h-5 mt-5 border-none text-pinkk-300 text-lg">Enter the Date</p>
              <input
              type="date"
              value={inputValue3}
             
              onChange={(e) => setInputValue3(e.target.value)}
              className="w-[250px] h-10 bg-pinkk-400 mt-5 border-pinkk-300 resize-none focus:outline-none"
            

            />
            </div>
            )}
             {location === "Reminder" && (
              <div className="flex flex-col">
              <p  className="w-full h-5 mt-5 border-none text-pinkk-300 text-lg">Enter the Date and Time</p>
            <input
            type="datetime-local"
            value={inputValue3}
          
            onChange={(e) => setInputValue4(e.target.value)}
            className="w-[250px] h-10 bg-pinkk-400 mt-5 border-pinkk-300 resize-none focus:outline-none"
          

            />
          </div>
             )}


          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
