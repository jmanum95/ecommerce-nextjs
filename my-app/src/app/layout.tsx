import type { Metadata } from "next";
import { Share_Tech } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const shareTech = Share_Tech({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${shareTech.className} antialiased flex flex-col min-h-screen`}
      >
        <title>Tech store</title>
        <main className="flex-1">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="light"
          />
          {children}
        </main>
      </body>
    </html>
  );
}
