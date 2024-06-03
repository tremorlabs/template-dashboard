export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative">
      {/* <BodyNavbar /> */}
      <main className="pt-10 p-4 sm:px-10 sm:pb-10 lg:pt-7">{children}</main>
    </div>
  )
}
