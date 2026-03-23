import type { Metadata } from "next";
import { Cormorant, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "百澤 Pactzo - 寻找你的命定之宠",
  description: "以东方智慧，通过八字五行为你匹配最契合的宠物伴侣",
  keywords: ["宠物匹配", "八字", "五行", "养宠物", "猫", "狗", "宠物测试", "百澤"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Noto+Serif+SC:wght@200;300;400;500;600;700;900&family=Space+Mono&family=ZCOOL+SongTi&family=ZCOOL+XiaoWei&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${cormorant.variable} ${playfair.variable} ${inter.variable} antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)]`}
      >
        {children}
      </body>
    </html>
  );
}
