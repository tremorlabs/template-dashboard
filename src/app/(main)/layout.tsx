export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative">
      {/* <BodyNavbar /> */}
      <main className="mt-10 px-4 sm:px-6 sm:pb-6 lg:mt-7">{children}</main>
    </div>
  )
}
