export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <main className="lg:pl-72">{children}</main>
}
