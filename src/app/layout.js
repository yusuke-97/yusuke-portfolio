import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat"
});

export const metadata = {
  title: "Yusuke Systems",
  description: "Yusuke Systemsは石山優友のポートフォリオです。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="stylesheet" href="/css/ress.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body className={`${inter.variable} ${montserrat.variable}`}>
        <Loader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
