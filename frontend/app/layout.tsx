import Sidebar from "@/components/Sidebar";
import "./globals.css";
import TanstackProviders from "@/components/TanstackProvider";
import ReactToastifyProviders from "@/components/ReactToastifyProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanstackProviders>
          <ReactToastifyProviders>
            <section className="flex">
              <Sidebar />

              {children}
            </section>
          </ReactToastifyProviders>
        </TanstackProviders>
      </body>
    </html>
  );
}
