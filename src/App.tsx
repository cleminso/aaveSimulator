import { MainSection } from "@/components/main-section";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App() {
  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col gap-4 p-4">
          <MainSection />
        </div>
        <div className="flex flex-col h-32 border-t p-4">
          <div className="flex items-center justify-center w-full">
            <p className="text-sm text-gray-500 text-center">
              This is an experimental simulator, Don't make financial decisions
              based solely on the results of this app
            </p>
          </div>
          <div className="flex items-center justify-between w-full mt-2">
            <p className="text-sm text-gray-500">Made by cleminso</p>
            <div className="flex items-center space-x-4">
              <img src="/twitter.svg" alt="Twitter" width="16" height="16" />
              <img
                src="/github.svg" alt="GitHub" width="16" height="16"
              />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
