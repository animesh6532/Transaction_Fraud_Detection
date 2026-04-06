import Sidebar from "@/components/layout/Sidebar";
import Topnav from "@/components/layout/Topnav";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main flex flex-col h-screen relative">
         <Topnav />
         {/* Content Area */}
         <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full max-w-[1600px] mx-auto z-10">
           {children}
         </main>
      </div>

      {/* Put Toaster here specifically for dashboard actions if preferred, or globally */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#f8fafc',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(148, 163, 184, 0.25)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
          },
        }}
      />
    </div>
  );
}
