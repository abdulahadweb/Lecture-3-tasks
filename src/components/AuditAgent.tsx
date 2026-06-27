import { useState } from "react";
import Markdown from "react-markdown";
import { Loader2, Search, Activity, Sparkles, LayoutTemplate } from "lucide-react";
import type { AgentResponse } from "../types";

export function AuditAgent() {
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
      const res = await fetch("/api/agent/ui-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data: AgentResponse = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to generate UI/UX audit.");
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
          <LayoutTemplate className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
            UI/UX Optimization & Audit
          </h2>
          <p className="text-sm text-slate-400 font-medium mt-1">
            Interactive self-service diagnostic tool to isolate frontend responsiveness breaks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-210px)] pb-6">
        {/* Input Panel */}
        <div className="flex flex-col space-y-4 bg-[#0B0F19]/80 backdrop-blur-sm p-6 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.2)] border border-[#1E293B]/80 relative">
          <div className="flex items-center justify-between mb-2">
             <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest flex items-center">
                <span>Target Architecture</span>
             </h3>
             <span className="text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-900/50 px-2 py-1 rounded-md">Diagnostic Engine</span>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
              </div>
              <input
                type="url"
                className="block w-full pl-12 pr-5 py-4 bg-[#030712]/50 border border-[#1E293B] rounded-2xl focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none text-sm transition-all placeholder:text-slate-600 font-mono text-slate-300 shadow-inner"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="group flex items-center justify-center w-full py-4 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] border border-purple-400/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin text-purple-100" />
                  Running Diagnostics...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-3 text-purple-200 group-hover:text-white transition-colors" />
                  Run Optimization Audit
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
               <li className="flex items-center"><span className="text-purple-400 mr-2">»</span> Linking to engineering handbook... <span className="ml-auto text-emerald-400">OK</span></li>
               <li className="flex items-center"><span className="text-purple-400 mr-2">»</span> Custom UI benchmarks... <span className="ml-auto text-emerald-400">LOADED</span></li>
               <li className="flex items-center"><span className="text-purple-400 mr-2">»</span> Visual hierarchy deep analytical rules... <span className="ml-auto text-emerald-400">MAPPED</span></li>
               <li className="flex items-center"><span className="text-purple-400 mr-2">»</span> Processing timeout set to 45s... <span className="ml-auto text-emerald-400">OK</span></li>
             </ul>
          </div>

          <div className="bg-purple-950/30 border border-purple-900/40 rounded-2xl p-4 mt-auto">
            <h4 className="text-sm font-semibold text-purple-300 mb-1.5 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
              UI/UX Audit Explainer
            </h4>
            <p className="text-xs text-purple-100/60 leading-relaxed font-medium">
              This interactive diagnostic agent analyzes site URLs against modern visual hierarchy principles and DOM layouts. It identifies responsiveness breaks and generates component-level optimization suggestions to serve as a warm engineering lead magnet.
            </p>
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col bg-[#0B0F19]/80 backdrop-blur-sm p-6 rounded-3xl border border-[#1E293B]/80 shadow-[0_4px_30px_rgba(0,0,0,0.2)] overflow-hidden">
          <div className="flex items-center justify-between mb-6 shrink-0">
             <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest flex items-center">
                <span>Performance Report</span>
             </h3>
             <div className="flex items-center space-x-2 text-xs font-mono">
               {loading && <span className="text-purple-400 animate-pulse drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">Running...</span>}
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
                <Search className="w-12 h-12 mb-4 text-slate-700 stroke-[1.5]" />
                <p className="text-sm font-medium text-center max-w-[200px] text-slate-500">Awaiting target URL to begin structural analysis.</p>
              </div>
            )}

            {loading && (
               <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
               <div className="relative">
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                  <Activity className="w-10 h-10 relative z-10 text-purple-400 animate-bounce drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
               </div>
               <p className="text-xs font-mono uppercase tracking-[0.2em] font-medium text-slate-500">Evaluating Conceptual DOM...</p>
             </div>
            )}

            {result && !loading && (
              <div className="prose prose-invert prose-sm max-w-none prose-headings:font-semibold prose-a:text-purple-400 prose-pre:bg-[#030712]/80 prose-pre:border prose-pre:border-[#1E293B] prose-pre:text-slate-300 markdown-body">
                <Markdown>{result}</Markdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
