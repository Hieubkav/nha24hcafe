import Header from "@/components/header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="">{children}</main>
    </>
  );
}
