import { Inter, Montserrat } from "next/font/google";
import "./style.css";
import AppBoot from "./components/AppBoot";
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
      <body className={`app-booting ${inter.variable} ${montserrat.variable}`}>
        <AppBoot />
        <Loader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
