import BodyNavbar from "@/components/ui/navigation/body-navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <BodyNavbar />
      <main className="lg:mt-6 mt-10 px-4 sm:px-6 sm:pb-6">{children}</main>
    </div>
  );
}
