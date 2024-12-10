import React, { useState, useEffect } from "react";
import { app } from "./firebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";

interface WriteProps {
  localLocation: string; // Define the prop type for location
}

const Read: React.FC<WriteProps> = ({ localLocation }) => {
  const [messageArray, setMessageArray] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false); // State to toggle visibility

  // Function to calculate days remaining
  const calculateDaysRemaining = (eventDate: string) => {
    const currentDate = new Date();
    const targetDate = new Date(eventDate);
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert time difference to days
    return `${daysRemaining} days until`;
  };

  const calculateTimeRemaining = (eventDate: string) => {
    const currentDate = new Date();
    const targetDate = new Date(eventDate);
    const timeDifference = targetDate.getTime() - currentDate.getTime();
  
    if (timeDifference <= 0) return "Event has passed"; // If event has already passed
  
    const daysRemaining = Math.floor(timeDifference / (1000 * 3600 * 24)); // Convert time difference to days
    const hoursRemaining = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600)); // Convert remaining time to hours
    const minutesRemaining = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60)); // Convert remaining time to minutes
  
    let timeRemaining = "";
  
    if (daysRemaining > 0) {
      timeRemaining += `${daysRemaining} days `;
    }
  
    if (hoursRemaining > 0) {
      timeRemaining += `${hoursRemaining} hours `;
    }
  
    timeRemaining += `${minutesRemaining} minutes until`;
  
    return timeRemaining;
  };

  // Fetch data from Firebase when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "appSpace/messages");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        // Store the keys along with the messages for deletion
        const data = Object.entries(snapshot.val()).map(([key, value]) => {
          // Ensure value is an object before spreading
          if (typeof value === 'object' && value !== null) {
            return { id: key, ...value };
          } else {
            return { id: key, value }; // Fallback for non-object values
          }
        });
        setMessageArray(data);
      } else {
        alert("No data found.");
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  // Remove a message from Firebase
  const removeMessage = async (id: string) => {
    const db = getDatabase(app);
    const messageRef = ref(db, `appSpace/messages/${id}`);
    await remove(messageRef)
      .then(() => {
        alert("Message removed successfully.");
        // Update the local state to reflect the deletion
        setMessageArray((prevMessages) =>
          prevMessages.filter((message) => message.id !== id)
        );
      })
      .catch((error) => {
        alert("Error removing message: " + error.message);
      });
  };

  // Fetch data and toggle visibility
  const handleButtonClick = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "appSpace/messages");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = Object.entries(snapshot.val()).map(([key, value]) => {
        // Ensure value is an object before spreading
        if (typeof value === 'object' && value !== null) {
          return { id: key, ...value };
        } else {
          return { id: key, value }; // Fallback for non-object values
        }
      });
      setMessageArray(data);
    } else {
      alert("No data found.");
    }
    setIsVisible(!isVisible); // Toggle visibility after fetching data
  };

  return (
      <div
    className={`absolute top-0 left-0 right-0 bottom-0 ${localLocation === 'Calendar' ? 'mt-[450px]' : 'mt-[130px]'}`}
  >
 

      <button
        onClick={handleButtonClick}
        className="text-pinkk-300 text-2xl pl-10 mb-5"
      >
        {isVisible ? <img src="/hidemessage.png" className="h-24 w-auto"></img> :
         <img src="/showmessage.png" className="h-24 w-auto"></img>
         }
      </button>

      {isVisible && (
        <div>
          {messageArray.map((item) =>
            item.Location === localLocation ? (
              <div key={item.id}> {/* Ensure unique key here */}
                <div className="bg-message bg-cover bg-contain bg-no-repeat text-pinkk-300 p-4 mb-5 rounded-md h-[113px] flex items-center">
                  <p className="w-fit px-5 bg-pinkk-100 rounded-xl translate-y-[-180%] translate-x-[-24%] rotate-23 overflow-visible m-0">
                    {item.Title}
                  </p>

                  <button
                    onClick={() => removeMessage(item.id)} // Use item.id here
                    className="px-5 ml-2 translate-y-[60%] translate-x-[-150%] mr-0"
                  >
                    <img src="/dustbin.svg" alt="Delete" className="w-12 h-12" />
                  </button>
                   {/* Countdown Display */}
                   {item.Date && (
                    <p className="w-full whitespace-normal break-words text-xl text-left translate-x-[-60%]">
                      {calculateDaysRemaining(item.Date)} {item.Message}
                    </p>
                  )}
                   {item.Time && (
                    <p className="w-full whitespace-normal break-words text-xl text-left translate-x-[-60%]">
                      {calculateTimeRemaining(item.Time)} {item.Message}
                    </p>
                  )}
                  {(!item.Date && !item.Time) && (
                  <p className="w-full whitespace-normal break-words text-xl text-left translate-x-[-60%]">
                    {item.Message}
                  </p>
                  )}
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default Read;
