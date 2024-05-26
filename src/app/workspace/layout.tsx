export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative px-4 pt-6 sm:px-6 sm:pt-4">
      {/* @CHRIS: dark mode */}
      {/* filling element between top of page and sticky search bar when page is scrolled */}
      <div className="fixed z-30 top-0 h-4 bg-white/90 backdrop-blur-sm inset-x-0" />
      {children}
    </main>
  );
}
