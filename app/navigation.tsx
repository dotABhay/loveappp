import Link from "next/link"; // Import Link for navigation

export default function Navigationhome() {
  return (
    <div className="bg-pinkk p-4 fixed bottom-0 w-full max-w-[414px]">
      <div className="flex justify-between items-center">
        {/* First icon with text - Home page */}
        <div className="flex flex-col items-center">
          <Link href="/">
            <img src="/home_icon.svg" alt="Home" className="w-8 h-8" />
          </Link>
        </div>

        {/* Second icon with text - Affirmations page */}
        <div className="flex flex-col items-center">
          <Link href="/affirmations">
            <img src="/affirmation_icon.svg" alt="Affirmations" className="w-8 h-8" />
          </Link>
        </div>

        {/* Third icon with text - Calendar page */}
        <div className="flex flex-col items-center">
          <Link href="/calendar">
            <img src="/calender_icon.svg" alt="Calendar" className="w-8 h-8" />
          </Link>
        </div>

        {/* Fourth icon with text - Love page */}
        <div className="flex flex-col items-center">
          <a href="/love">
            <img src="/love_icon.svg" alt="Love" className="w-8 h-8" />
            </a>
        </div>

        {/* Fifth icon with text - Reminder page */}
        <div className="flex flex-col items-center">
          <Link href="/reminder">
            <img src="/reminder_icon.svg" alt="Reminder" className="w-8 h-8" />
          </Link>
        </div>
      </div>
    </div>
  );
}
