"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "tailwindcss/tailwind.css";

export function CalendarTest() {
  const today = new Date();

  return (
    <DayPicker
      mode="single"
      defaultMonth={today}
      showOutsideDays
      className="p-3 bg-pinkk-25 rounded-lg shadow-md w-[90%] mx-auto"
      classNames={{
        months: "flex flex-col space-y-4 ",
        month: "space-y-4",
        caption: "flex justify-between items-center text-black text-lg",
        caption_label: "text-pinkk-300 font-semibold",
        nav: "flex items-center space-x-2",
        nav_button: "h-8 w-8 p-0 rounded-full hover:bg-pinkk flex items-center justify-center",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-pinkk-300 rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "relative p-0 text-center text-sm",
        day: "h-8 w-8 p-0 font-normal text-pinkk-300  rounded-full", // Added background to inside days
        day_today: "bg-pinkk-300 text-white bg-pinkk", // Highlight today with a different background
        day_outside: "text-black opacity-20", // Styling for outside days
        day_disabled: "text-black opacity-40",
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-5 w-5" {...props} />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-5 w-5" {...props} />
        ),
      }}
      modifiers={{
        today: today, // Highlight the current date
      }}
    />
  );
}
