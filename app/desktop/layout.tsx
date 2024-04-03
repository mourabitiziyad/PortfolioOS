import { DesktopView } from "@/components/ui/desktop-view";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <DesktopView>
      {children}
    </DesktopView>
  )
}