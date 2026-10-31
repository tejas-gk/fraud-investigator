import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "azentio.ai | Banking intelligence",
  description: "Enterprise AI discovery and governed collaboration for banking.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
