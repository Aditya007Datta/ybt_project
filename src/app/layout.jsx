import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import Login from "@/components/Login";

import "src/app/globals.css";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />
      </head>
      <body>
        <div>
          <Header />

          <main className="bg-page-gradient pt-navigation-height">
            {children}
          </main>
          <Login />

          <Footer />
        </div>
      </body>
    </html>
  );
}
