import { DesktopView } from "@/components/ui/desktop-view";
import { CRTMonitor } from "@/components/ui/crt-monitor";

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
