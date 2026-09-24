import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "日経・QUICK ニュース",
  description: "日経とQUICKの最新日本語ニュースを各3件表示。",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
