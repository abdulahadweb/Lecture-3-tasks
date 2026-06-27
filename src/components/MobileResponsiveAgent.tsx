import { useState } from "react";
import Markdown from "react-markdown";
import { Loader2, Search, Activity, Sparkles, Smartphone } from "lucide-react";
import type { AgentResponse } from "../types";

export function MobileResponsiveAgent() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/agent/mobile-responsive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data: AgentResponse = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to generate mobile responsiveness audit.");
      }

      setResult(data.result || null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center space-x-4 mb-2">
        <div className="p-3 bg-[#111827] border border-[#1E293B] text-slate-200 rounded-2xl shadow-sm shadow-[#111827]/50">
          <Smartphone className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
            Mobile Responsiveness QA
          </h2>
          <p className="text-sm text-slate-400 font-medium mt-1">
            Detect viewport issues, touch target constraints, and responsive structural breaks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-210px)] pb-6">
        {/* Input Panel */}
        <div className="flex flex-col space-y-4 bg-[#0B0F19]/80 backdrop-blur-sm p-6 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.2)] border border-[#1E293B]/80 relative">
          <div className="flex items-center justify-between mb-2">
             <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest flex items-center">
                <span>Viewport Target</span>
             </h3>
             <span className="text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-900/50 px-2 py-1 rounded-md">Mobile Analysis</span>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500 group-focus-within:text-amber-400 transition-colors" />
              </div>
              <input
                type="url"
                className="block w-full pl-12 pr-5 py-4 bg-[#030712]/50 border border-[#1E293B] rounded-2xl focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none text-sm transition-all placeholder:text-slate-600 font-mono text-slate-300 shadow-inner"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="group flex items-center justify-center w-full py-4 px-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-2xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] border border-amber-400/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin text-amber-100" />
                  Analyzing Viewport Rules...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-3 text-amber-200 group-hover:text-white transition-colors" />
                  Run Mobile Audit
                </>
              )}
            </button>
          </form>

          {/* Decorative placeholder matching PDF concept of internal handbook mapping */}
          <div className="mt-6 flex flex-col flex-grow bg-[#030712]/80 border border-[#1E293B]/60 rounded-2xl p-5 shadow-inner">
             <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-mono border-b border-[#1E293B] pb-2">
                <span className="tracking-widest">SYSTEM_RUNTIME</span>
                <span className="text-emerald-400 flex items-center space-x-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(52,211,153,0.8)]"></span><span>ONLINE</span></span>
             </div>
             <ul className="text-[11px] text-slate-400 space-y-2.5 font-mono drop-shadow-sm">
               <li className="flex items-center"><span className="text-amber-400 mr-2">»</span> Initializing cross-browser checks... <span className="ml-auto text-emerald-400">READY</span></li>
               <li className="flex items-center"><span className="text-amber-400 mr-2">»</span> Evaluating touch target limits... <span className="ml-auto text-emerald-400">LOADED</span></li>
               <li className="flex items-center"><span className="text-amber-400 mr-2">»</span> Applying responsive breakpoints... <span className="ml-auto text-emerald-400">READY</span></li>
               <li className="flex items-center"><span className="text-amber-400 mr-2">»</span> Layout shift tracking... <span className="ml-auto text-emerald-400">OK</span></li>
             </ul>
          </div>

          <div className="bg-amber-950/30 border border-amber-900/40 rounded-2xl p-4 mt-auto">
            <h4 className="text-sm font-semibold text-amber-300 mb-1.5 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
              Mobile QA Explainer
            </h4>
            <p className="text-xs text-amber-100/60 leading-relaxed font-medium">
              This digital FTE evaluates the provided URL for responsive layout constraints. It isolates viewport issues, validates minimum touch targets, and provides component-level Tailwind/CSS fixes.
            </p>
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col bg-[#0B0F19]/80 backdrop-blur-sm p-6 rounded-3xl border border-[#1E293B]/80 shadow-[0_4px_30px_rgba(0,0,0,0.2)] overflow-hidden">
          <div className="flex items-center justify-between mb-6 shrink-0">
             <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest flex items-center">
                <span>Responsiveness Report</span>
             </h3>
             <div className="flex items-center space-x-2 text-xs font-mono">
               {loading && <span className="text-amber-400 animate-pulse drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">Evaluating...</span>}
               {result && !loading && <span className="text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">Completed</span>}
             </div>
          </div>

          <div className="flex-1 overflow-y-auto px-1 custom-scrollbar">
            {error && (
              <div className="p-5 bg-red-950/30 text-red-400 border border-red-900/50 rounded-2xl text-sm font-medium">
                {error}
              </div>
            )}
            
            {!error && !result && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 opacity-80">
                <Smartphone className="w-12 h-12 mb-4 text-slate-700 stroke-[1.5]" />
                <p className="text-sm font-medium text-center max-w-[200px] text-slate-500">Awaiting target URL to begin mobile audit.</p>
              </div>
            )}

            {loading && (
               <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
               <div className="relative">
                  <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse"></div>
                  <Activity className="w-10 h-10 relative z-10 text-amber-400 animate-bounce drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
               </div>
               <p className="text-xs font-mono uppercase tracking-[0.2em] font-medium text-slate-500">Generating breakdown...</p>
             </div>
            )}

            {result && !loading && (
              <div className="prose prose-invert prose-sm max-w-none prose-headings:font-semibold prose-a:text-amber-400 prose-pre:bg-[#030712]/80 prose-pre:border prose-pre:border-[#1E293B] prose-pre:text-slate-300 markdown-body">
                <Markdown>{result}</Markdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
