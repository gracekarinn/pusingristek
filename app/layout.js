import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const poppins = Poppins({ weight: ['400', '700'], subsets: ["latin"] });

export const metadata = {
  title: "Money tracker",
  description: "Created by Grace Karin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        {children}
        </body>
    </html>
  );
}
