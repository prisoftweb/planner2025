import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  //#F8FAFC
  title: "Planner",
  description: "Generated by create next app",
  icons: {
    icon: ['/nuevoIcono.jpg?v=4']
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          //pauseOnFocusLoss
          draggable
          //pauseOnHover
          theme="light"
        />
          {children}            
        <ToastContainer/>
      </body>
    </html>
  );
}
