import "./globals.css";
import TanstackProviders from "@/components/TanstackProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanstackProviders>{children}</TanstackProviders>
      </body>
    </html>
  );
}
