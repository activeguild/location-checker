import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "位置情報チェッカー",
  description: "位置情報の許可状態を確認するアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
