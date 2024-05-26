export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative px-4 pt-6 sm:px-6 sm:pt-4">
      {/* @CHRIS: dark mode */}
      {children}
    </main>
  );
}
