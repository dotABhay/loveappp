"use client";
import { useState } from "react";

import Navigationhome from "../navigation";
import Read from "../Read";
import Write from "../write";
import { CalendarTest } from "../test";

const location = "Calendar";

export default function Calendar() {
  // State to control the visibility of the Write input
  const [isWriting, setIsWriting] = useState(false);

  // Function to handle saving the input (can be passed to Write component)
  const handleSave = (title: string, body: string) => {
    console.log("Saved Title:", title);
    console.log("Saved Body:", body);
    setIsWriting(false); // Hide the input after saving
  };

  // Function to handle going back (can be passed to Write component)
  const handleBack = () => {
    setIsWriting(false); // Hide the input when going back
  };

  // Function to toggle the Write component visibility
  const toggleWrite = () => {
    setIsWriting(!isWriting);
  };

  return (
    
    <div className="bg-pinkk bg-cover w-full h-screen bg-pinkk relative z-0">
      {isWriting && (
        <Write
          location={location}
          onSave={handleSave}  // Pass the handleSave function to Write component
          onBack={handleBack}  // Pass the handleBack function to Write component
        />
      )}
      <div className="flex flex-col">
        <h1 className="text-6xl text-pinkk-300 mx-6 py-10">Calendar</h1>
        <CalendarTest />
        
        <div className=" my-3">
        <Read localLocation={location}/>
          {/* Button to toggle input visibility */}
          <button
            onClick={toggleWrite} // Toggle the Write component visibility
            className="text-pinkk-300 text-4xl"
          >
            <img
              src="/plus.svg"
              alt="Add"
              className="w-auto h-auto transform translate-x-[320%] translate-y-[200%]"
            />
          </button>
        </div>
      </div>

      {/* Conditionally render Write component based on isWriting state */}
      

      
      <Navigationhome />
    </div>
  );
}
