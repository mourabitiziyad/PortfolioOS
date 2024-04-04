import { MotionDiv } from "./motion-div";
import { MobileOnlyBar } from "./ui/mobile-only-bar";
import { WindowBar } from "./ui/window-bar";

export const Window = ({ children }: { children: React.ReactNode }) => {

  return (
    <MotionDiv
      className="absolute h-[90%] w-full self-center md:m-4 md:relative md:h-full border-1 rounded-md bg-accent"
      initial={{ opacity: 0.5, y: -20 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full flex flex-col">
        <div className="flex-none relative">
          <WindowBar />
        </div>
        <div className="flex-none relative">
          <MobileOnlyBar />
        </div>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </MotionDiv>
  );
};