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
        months: "flex flex-col space-y-4",
        month: "space-y-4",
        caption: "flex justify-between items-center text-black text-lg",
        caption_label: "text-base font-semibold",
        nav: "flex items-center space-x-2",
        nav_button: "h-8 w-8 p-0 rounded-full hover:bg-pinkk flex items-center justify-center",
        table: "w-full border-collapse",
        head_row: "flex justify-between",
        head_cell: "text-pinkk-300 font-medium text-xs w-8 text-center",
        row: "flex justify-between mt-1",
        cell: "relative p-0 text-center text-sm",
        day: "h-10 w-10 p-0 rounded-full text-black font-medium hover:bg-pink-200 flex items-center justify-center",
        day_today: "bg-pinkk-300 text-white font-bold",
        day_outside: "text-gray-400 opacity-50", // Styling for outside days
        day_disabled: "text-gray-400 opacity-50",
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
