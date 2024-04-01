import { CRTMonitor } from "@/components/ui/crt-monitor";
import { DesktopView } from "@/components/ui/desktop-view";
import { LockScreen } from "@/components/ui/lock-screen";

export default function Home() {
  return (
    <main className="min-h-screen flex xl:p-24 xl:w-5/6 w-full mx-auto">
      <div className="relative min-h-full min-w-full">
        <CRTMonitor>
          <LockScreen />
          {/* <DesktopView /> */}
        </CRTMonitor>
      </div>
    </main>
  );
}
