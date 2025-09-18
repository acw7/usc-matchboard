import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Matchboard",
  description: "USC Section-Swap & Study-Group",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
