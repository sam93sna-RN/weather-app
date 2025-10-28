import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "福岡 天気予報 (Open-Meteo)",
  description: "Next.jsで作成した天気予報アプリ",
};

export default function RootLayout({ children }) {
  return (
    // htmlタグに "dark" クラスを適用
    <html lang="ja" className="dark">
      {/*
        Next.js App Routerでは <head> タグは自動的に管理されるため、手動で追加するとビルドエラーの原因になります。
        <link> タグなどは <html> の直下に配置することで、Next.jsが適切に <head> 内に展開します。
      */}
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      
      {/* bodyタグにカスタムフォント(font-display)と
        カスタム背景色(bg-background-dark)を適用 
      */}
      <body className={`${inter.className} font-display bg-background-dark`}>
        {children}
      </body>
    </html>
  );
}

