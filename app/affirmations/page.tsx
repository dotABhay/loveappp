"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";

import Navigationhome from "../navigation";

const location = "affirmations";

// Dynamically import the Read component with SSR disabled
const Read = dynamic(() => import("../Read"), {
  ssr: false, // Disables server-side rendering
  loading: () => <p>Loading affirmations...</p>, // Placeholder while loading
});

// Dynamically import the Write component with SSR disabled
const Write = dynamic(() => import("../write"), {
  ssr: false, // Disables server-side rendering
  loading: () => <p>Loading write input...</p>, // Placeholder while loading
});

export default function Affirmations() {
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
    <div className="bg-affirmations bg-cover w-full h-screen bg-pinkk relative z-0">
      {isWriting && (
        <Suspense fallback={<p>Loading write input...</p>}>
          <Write
            location={location}
            onSave={handleSave} // Pass the handleSave function to Write component
            onBack={handleBack} // Pass the handleBack function to Write component
          />
        </Suspense>
      )}
      <div className="flex flex-col">
        <h1 className="text-6xl text-pinkk-300 mx-6 py-10">Affirmations</h1>
        <Suspense fallback={<p>Loading affirmations...</p>}>
          {/* Dynamically render the Read component */}
          <Read localLocation={location} />
        </Suspense>
        <div className="my-3">
          {/* Button to toggle input visibility */}
          <button
            onClick={toggleWrite} // Toggle the Write component visibility
            className="text-pinkk-300 text-4xl"
          >
            <img
              src="/plus.svg"
              alt="Add"
              className="w-auto h-auto transform translate-x-[320%] translate-y-[500%]"
            />
          </button>
        </div>
      </div>

      <Navigationhome />
    </div>
  );
}
