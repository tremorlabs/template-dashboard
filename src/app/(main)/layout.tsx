export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative">
      {/* <BodyNavbar /> */}
      <main className="pt-10 p-4 sm:px-6 sm:pb-6 lg:pt-7">{children}</main>
    </div>
  )
}
