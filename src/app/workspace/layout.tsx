export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="px-4 pt-6 sm:p-6">{children}</main>;
}
