import { MainSection } from "@/components/main-section";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App() {
  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col gap-4 p-4">
          <MainSection />
        </div>
        <div className="flex items-center justify-end h-16 border-t p-4">
          <p className="text-sm text-gray-500">Made by cleminso</p>
        </div>
      </div>
    </TooltipProvider>
  );
}
