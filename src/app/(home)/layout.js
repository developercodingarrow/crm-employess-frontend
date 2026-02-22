import AppContextProvider from "../../_contextApi/AppContextProvider";
import FillterContextProvider from "../../_contextApi/FillterContextProvider";
import MainUILayout from "../../components/layouts/MainUILayout";
import MainNavbar from "../../components/navbar/mainnavbar/MainNavbar";
import "../globals.css";
import { Inter } from "next/font/google";

// Configure the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Ensures text remains visible during webfont load
  variable: "--font-inter", // CSS variable name
});

export const metadata = {
  title: "Property CRM | login ",
  description: "login page",
};

export default function HomeLayout({ children }) {
  return (
    <div className="font-sans antialiased">
      <AppContextProvider> 
      <FillterContextProvider>
        <MainUILayout>{children}</MainUILayout>
      </FillterContextProvider>
      </AppContextProvider>
    </div>
  );
}
