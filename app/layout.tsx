import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Import Poppins from Google Fonts
import "./globals.css";

// Configure Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Specify font weights
});

export const metadata: Metadata = {
  title: "LoveApp",
  description: "Fur Anna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`} // Apply Poppins font globally
      >
        {children}
      </body>
    </html>
  );
}
