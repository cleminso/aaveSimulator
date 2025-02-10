import { MainSection } from "@/components/main-section";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App() {
  return (
    <TooltipProvider>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <MainSection />
      </div>
    </TooltipProvider>
  );
}
