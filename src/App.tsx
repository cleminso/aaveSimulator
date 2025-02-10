import { MainSection } from "@/components/main-section";
import { TooltipProvider } from "@/components/ui/tooltip";
import TwitterIcon from "@/assets/twitter.svg?url";
import GithubIcon from "@/assets/github.svg?url";

export default function App() {
  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col gap-4 p-4">
          <MainSection />
        </div>
        <div className="flex items-center justify-between h-16 border-t p-4 m-6">
          <p className="text-sm text-zinc-700">Made by cleminso</p>
          <div className="flex-1 flex justify-center">
            <p className="text-sm text-zinc-700 text-center">
              This is an experimental simulator. Don't make financial decisions
              based solely on the results of this app
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <img src={TwitterIcon} width="24" height="23" />
            <img src={GithubIcon} width="24" height="23" />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
