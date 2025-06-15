import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Medicare Pro',
  description: 'SaaS Based Medical Platform',
};


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      foxified="" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html >
  );
}


// git init
// git add .
// git commit -m "Project created"
// git branch -M main
// git remote add origin https://github.com/kamrul2006/Medicare-Pro-Frontend_JT.git
// git push -u origin main