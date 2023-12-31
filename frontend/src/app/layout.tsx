import Navbar from "./navbar";
import { Providers } from "../app/redux_Toolkit/provider";
export const metadata = {
  title: "E-commerce",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content="login,signin,signup" />
      <meta name="author" content="Sahadev" />
      <meta name="publisher" content="Dahit" />
      <meta name="copyright" content="John Doe" />
      <meta
        name="description"
        content="This short description describes my website."
      />
      <meta name="page-topic" content="auth"></meta>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        ></link>
      </head>
      <body>
        <Providers>
        <Navbar />
        {children}</Providers>
      </body>
    </html>
  );
}
