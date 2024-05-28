export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="relative p-4 sm:pt-4 sm:px-6 sm:pb-6">
            {children}
        </section>
    );
}
