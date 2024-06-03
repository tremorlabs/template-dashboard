export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative">
      {/* <BodyNavbar /> */}
      <main className="p-4 pt-10 sm:px-6 sm:pb-6 lg:pt-7">{children}</main>
    </div>
  )
}
