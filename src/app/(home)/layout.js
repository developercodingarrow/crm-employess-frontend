import AppContextProvider from "../../_contextApi/AppContextProvider";
import FillterContextProvider from "../../_contextApi/FillterContextProvider";
import ReminderContextProvider from "../../_contextApi/ReminderContextProvider";
import ReminderPopup from "../../components/home_dashbord/Reminder_Popup/ReminderPopup";
import MainUILayout from "../../components/layouts/MainUILayout";
import RecentActivitiesModel from "../../components/models/RecentActivitiesModel";
import ReminderModel from "../../components/models/ReminderModel";
import MainNavbar from "../../components/navbar/mainnavbar/MainNavbar";
import "../globals.css";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

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

export default async function HomeLayout({ children }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;
    const loginUserString = cookieStore.get("user")?.value;
    // SAFE PARSING - Check if string exists and is valid
    let loginUser = null;
    if (loginUserString) {
      try {
        loginUser = JSON.parse(loginUserString);
      } catch (parseError) {
        // Clear invalid cookie
        // You might want to handle this differently
      }
    }
    if (!token) {
      // Redirect to login instead of throwing error
      redirect("/login");
    }
    return (
      <div className="font-sans antialiased">
        <AppContextProvider>
          <ReminderContextProvider>
            <FillterContextProvider>
              <ReminderPopup />
              <RecentActivitiesModel />
              <ReminderModel />
              <MainUILayout loginUser={loginUser}>{children}</MainUILayout>
            </FillterContextProvider>
          </ReminderContextProvider>
        </AppContextProvider>
      </div>
    );
  } catch (error) {
    redirect("/login");
  }
}
