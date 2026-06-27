import { useState } from "react";
import { Briefcase, LayoutTemplate, Github, GitBranch, Sparkles, User, Menu, X, SearchCode, Code2, Smartphone } from "lucide-react";
import { LeadAgent } from "./components/LeadAgent";
import { AuditAgent } from "./components/AuditAgent";
import { SeoAgent } from "./components/SeoAgent";
import { UnitTestAgent } from "./components/UnitTestAgent";
import { MobileResponsiveAgent } from "./components/MobileResponsiveAgent";
import { cn } from "./lib/utils";
import type { AgentWorkflow } from "./types";

export default function App() {
  const [activeWorkflow, setActiveWorkflow] = useState<AgentWorkflow>("lead");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#030712] font-sans text-slate-300 selection:bg-blue-500/30 selection:text-blue-200">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 bg-[#0B0F19] border-r border-[#1E293B] flex flex-col shrink-0 overflow-hidden transform transition-all duration-300 ease-in-out lg:static shadow-2xl lg:shadow-none",
        isSidebarOpen ? "translate-x-0 w-72" : "-translate-x-full w-72",
        isDesktopCollapsed ? "lg:w-0 lg:border-none lg:px-0 lg:opacity-0" : "lg:w-72 lg:translate-x-0 lg:opacity-100"
      )}>
        <div className="w-72 flex flex-col h-full">
          <div className="p-6 border-b border-[#1E293B]/60 flex items-center justify-between mt-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center rounded-xl shadow-lg shadow-blue-900/20 border border-blue-400/20">
                <Sparkles className="w-5 h-5 text-blue-50" />
              </div>
              <div>
                <div className="font-bold text-[15px] tracking-tight text-white">~AAM Digital Labs</div>
                <div className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.2em] mt-0.5 text-blue-400/80">Agentic Workflows</div>
              </div>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 px-4 py-8 space-y-10 overflow-y-auto custom-scrollbar">
            <div>
              <h3 className="uppercase tracking-[0.15em] text-[10px] font-semibold text-slate-500 mb-3 px-2">Active Agents</h3>
              <nav className="space-y-1.5">
                <button
                  onClick={() => {
                    setActiveWorkflow("lead");
                    setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group border",
                    activeWorkflow === "lead" 
                      ? "bg-slate-800/80 text-white border-slate-700/50 shadow-sm" 
                      : "border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                  )}
                >
                  <Briefcase className={cn("w-4 h-4 mr-3 transition-colors", activeWorkflow === "lead" ? "text-blue-400" : "text-slate-500 group-hover:text-blue-400/70")} />
                  Lead Acquisition
                </button>
                
                <button
                  onClick={() => {
                    setActiveWorkflow("audit");
                    setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group border",
                    activeWorkflow === "audit" 
                      ? "bg-slate-800/80 text-white border-slate-700/50 shadow-sm" 
                      : "border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                  )}
                >
                  <LayoutTemplate className={cn("w-4 h-4 mr-3 transition-colors", activeWorkflow === "audit" ? "text-purple-400" : "text-slate-500 group-hover:text-purple-400/70")} />
                  UI/UX Audit
                </button>

                <button
                  onClick={() => {
                    setActiveWorkflow("seo");
                    setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group border",
                    activeWorkflow === "seo" 
                      ? "bg-slate-800/80 text-white border-slate-700/50 shadow-sm" 
                      : "border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                  )}
                >
                  <SearchCode className={cn("w-4 h-4 mr-3 transition-colors", activeWorkflow === "seo" ? "text-emerald-400" : "text-slate-500 group-hover:text-emerald-400/70")} />
                  SEO Audit
                </button>

                <button
                  onClick={() => {
                    setActiveWorkflow("unit-test");
                    setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group border",
                    activeWorkflow === "unit-test" 
                      ? "bg-slate-800/80 text-white border-slate-700/50 shadow-sm" 
                      : "border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                  )}
                >
                  <Code2 className={cn("w-4 h-4 mr-3 transition-colors", activeWorkflow === "unit-test" ? "text-rose-400" : "text-slate-500 group-hover:text-rose-400/70")} />
                  Unit Testing QA
                </button>

                <button
                  onClick={() => {
                    setActiveWorkflow("mobile-responsive");
                    setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group border",
                    activeWorkflow === "mobile-responsive" 
                      ? "bg-slate-800/80 text-white border-slate-700/50 shadow-sm" 
                      : "border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                  )}
                >
                  <Smartphone className={cn("w-4 h-4 mr-3 transition-colors", activeWorkflow === "mobile-responsive" ? "text-amber-400" : "text-slate-500 group-hover:text-amber-400/70")} />
                  Mobile QA Audit
                </button>
              </nav>
            </div>
            
            <div>
              <h3 className="uppercase tracking-[0.15em] text-[10px] font-semibold text-slate-500 mb-3 px-2">Connected Records</h3>
              <div className="space-y-1.5 px-2">
                 <div className="flex items-center px-1 py-2 text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer group rounded-lg hover:bg-slate-800/30">
                   <Github className="w-4 h-4 mr-3 text-slate-500 group-hover:text-slate-400" />
                   <span className="font-medium tracking-wide">Production Repositories</span>
                 </div>
                 <div className="flex items-center justify-between px-1 py-2 text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer group rounded-lg hover:bg-slate-800/30">
                    <div className="flex items-center">
                      <GitBranch className="w-4 h-4 mr-3 text-slate-500 group-hover:text-slate-400" />
                      <span className="font-medium tracking-wide">Portfolio Database</span>
                    </div>
                    <span className="flex h-2 w-2 relative mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                 </div>
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-[#1E293B]/60 bg-[#0B0F19]/50 shrink-0">
            <div className="flex items-center space-x-3">
               <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 overflow-hidden shrink-0 shadow-inner">
                 <User className="w-4 h-4" />
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Admin</span>
                 <span className="text-sm font-semibold text-slate-200">Abdul Ahad</span>
               </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden h-full flex flex-col relative bg-[#030712] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,58,138,0.07),rgba(255,255,255,0))]">
        <header className="absolute top-0 w-full bg-[#030712]/60 backdrop-blur-xl border-b border-[#1E293B]/60 h-16 flex items-center px-4 md:px-8 z-10 transition-all">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 mr-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
            className="hidden lg:flex p-2 -ml-2 mr-4 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-medium text-slate-300 tracking-wide flex items-center space-x-3 truncate">
            <span className="hidden md:flex shrink-0 w-6 h-6 rounded-md bg-slate-800 border border-slate-700 items-center justify-center">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
            </span>
            <span className="truncate">
              {activeWorkflow === "lead" 
                && "Workflow 1: Automated Lead Acquisition & Scoping"}
              {activeWorkflow === "audit"
                && "Workflow 2: Interactive UI/UX Optimization Audit"}
              {activeWorkflow === "seo"
                && "Workflow 3: SEO Vulnerability Optimization"}
              {activeWorkflow === "unit-test"
                && "Workflow 4: QA Auto-Pilot"}
              {activeWorkflow === "mobile-responsive"
                && "Workflow 5: Mobile Responsiveness QA"}
            </span>
          </h1>
        </header>
        
        <div className="flex-1 overflow-y-auto w-full h-full pt-16">
          <div className="min-h-full max-w-7xl mx-auto py-6">
            {activeWorkflow === "lead" && <LeadAgent />}
            {activeWorkflow === "audit" && <AuditAgent />}
            {activeWorkflow === "seo" && <SeoAgent />}
            {activeWorkflow === "unit-test" && <UnitTestAgent />}
            {activeWorkflow === "mobile-responsive" && <MobileResponsiveAgent />}
          </div>
        </div>
      </main>
    </div>
  );
}
