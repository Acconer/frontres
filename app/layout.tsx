import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import 'gridjs/dist/theme/mermaid.min.css'
import '@/src/assets/index.scss'
import LayoutGlobal from "@/src/components/Global/LayoutGlobal";
 
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurante F Demo",
  description: "A demo for Restaurante F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutGlobal letter={montserrat}>
      {children}
    </LayoutGlobal>
  );
}
