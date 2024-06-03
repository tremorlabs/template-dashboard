export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative">
      <main className="p-4 pt-10 sm:px-10 sm:pb-10 lg:pt-7">{children}</main>
    </div>
  )
}
