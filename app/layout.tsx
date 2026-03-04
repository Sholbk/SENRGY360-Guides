import type { Metadata } from "next";
import { Montserrat, Nunito_Sans, Poppins, Questrial } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const questrial = Questrial({
  variable: "--font-subheading",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "SENERGY360 - Your Path to a Healthier Home",
  description: "Join the SENERGY360 community and receive expert-created guides with practical, research-informed strategies to optimize your home environment and reduce toxic load.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon-180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${nunitoSans.variable} ${poppins.variable} ${questrial.variable} antialiased`}
        style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
