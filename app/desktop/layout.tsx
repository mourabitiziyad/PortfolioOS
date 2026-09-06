import { DesktopView } from "@/components/ui/desktop-view";
import { CRTMonitor } from "@/components/ui/crt-monitor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PortfolioOS",
  description: "An interactive desktop-inspired view of Ziyad Mourabiti's portfolio.",
  robots: { index: false, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="portfolio-os-shell">
      <div className="portfolio-os-frame">
        <CRTMonitor>
          <DesktopView>{children}</DesktopView>
        </CRTMonitor>
      </div>
    </div>
  )
}
