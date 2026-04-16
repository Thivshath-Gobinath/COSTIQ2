import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "COSTIQ Professionals — Beyond Numbers. Toward Impact.",
  description:
    "COSTIQ Professionals delivers strategic financial intelligence through AI-powered consultation. Start your advisory session today.",
  openGraph: {
    title: "COSTIQ Professionals",
    description: "Beyond Numbers. Toward Impact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;1,14..32,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ backgroundColor: "#0C1E32" }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
