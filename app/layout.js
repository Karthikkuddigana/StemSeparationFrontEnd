import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionManager from "@/components/SessionManager";
import Loader from "@/components/Loader"; 
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Stem Separation",
  description: "Separate stems from your audio file",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionManager>
          
          <GoogleOAuthProvider clientId="165465259820-frjlikql0msnl9qffanlmdqe35f3baih.apps.googleusercontent.com">
            <Navbar />
            <Loader>{children}</Loader>
            <Footer />
          </GoogleOAuthProvider>
          
          
        </SessionManager>
        
      </body>
    </html>
  );
}

// await axios.post("https://localhost:7000/api/LoginAndRegister/GoogleSignIn", {
//   IdToken: credentialResponse.credential}
// );
