export const metadata = {
  title: "City Scramble Solver",
  description: "Cari nama kota dari scramble huruf + 3 vokal"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 20, fontFamily: "sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
