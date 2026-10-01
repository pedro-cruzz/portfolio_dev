import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@fontsource/jetbrains-mono/400.css";
import "./globals.css";
export const metadata: Metadata = {
  title: "Pedro Henrique Cruz Vilas Bôas — Software Developer",
  description:
    "Pedro Henrique Cruz Vilas Bôas, desenvolvedor de software formado em ADS e estudante de Sistemas de Informação. Projetos de sistemas de gestão, backend e aplicações web.",
};
const themeInit = `(function(){try{var t=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch(e){document.documentElement.dataset.theme='dark'}})()`;
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
