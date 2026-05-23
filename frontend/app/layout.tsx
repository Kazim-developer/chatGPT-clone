import Sidebar from "@/components/Sidebar";
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
        <TanstackProviders>
          <section className="flex gap-2">
            <Sidebar />
            {children}
          </section>
        </TanstackProviders>
      </body>
    </html>
  );
}
