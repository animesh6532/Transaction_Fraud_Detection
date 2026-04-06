import LiveAlertFeed from "@/components/LiveAlertFeed";
import { Zap } from "lucide-react";

export default function AlertsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto h-[calc(100vh-10rem)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
             <Zap className="text-red-500 w-8 h-8" />
             Live Threat Feed
          </h1>
          <p className="text-slate-400">Real-time incoming alerts across all network nodes.</p>
        </div>
      </div>

      <div className="flex-1">
         {/* Reusing LiveAlertFeed component but letting it expand fully */}
         <div className="h-full">
            <LiveAlertFeed />
         </div>
      </div>
    </div>
  );
}
