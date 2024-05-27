export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative px-4 py-6 sm:px-6 sm:py-4">
      {/* @CHRIS: dark mode */}
      {children}
    </main>
  );
}
