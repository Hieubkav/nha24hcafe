import Header from "@/components/header";
import { siteMetadata } from './metadata';

export const metadata = siteMetadata;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="">{children}</main>
    </>
  );
}
