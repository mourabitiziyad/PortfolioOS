import CRTMonitor from "@/components/ui/crt-monitor";

export default function Home() {
  return (
    <main className="min-h-screen flex p-24">
      <div className="relative min-h-full min-w-full">
        <CRTMonitor>
          <div className="flex flex-col justify-center items-center h-full w-full">
            <h1 className="text-4xl font-semibold text-white">PortfolioOS <span className="font-extralight">Merzouga</span></h1>
            <p className="text-white"><button className="text-secondary">Click to continue {"->"}</button></p>
          </div>
        </CRTMonitor>
      </div>
    </main>
  );
}
