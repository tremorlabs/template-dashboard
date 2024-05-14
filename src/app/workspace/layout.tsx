export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <main className="p-4 sm:p-6">{children}</main>
}
