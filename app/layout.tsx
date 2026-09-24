import type { Metadata } from "next";
import Script from "next/script";
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
      <body className="antialiased">
        {children}
        <Script id="gbase-chatbot-config" strategy="beforeInteractive">
          {`window.gptbaseConfig = {
            chatbotId: '791af1a9-b938-45a3-878a-d8004600f4c6',
            baseUrl: 'https://admin.gbase.ai',
            apiBaseUrl: 'https://admin.gbase.ai/api',
          };`}
        </Script>
        <Script
          src="https://gbase.ai/plugin/plugin.js"
          id="791af1a9-b938-45a3-878a-d8004600f4c6"
          strategy="afterInteractive"
          defer
        />
      </body>
    </html>
  );
}
