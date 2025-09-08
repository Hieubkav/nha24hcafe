import Header from "@/components/header";
import AnnouncementBar from "@/components/announcement-bar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-svh grid-rows-[auto_auto_1fr]">
      <AnnouncementBar />
      <Header />
      {children}
    </div>
  );
}
