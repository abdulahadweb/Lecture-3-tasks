import { useState } from "react";
import Markdown from "react-markdown";
import { Loader2, Sparkles, Send, Activity, Bot } from "lucide-react";
import type { AgentResponse } from "../types";

export function LeadAgent() {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/agent/lead-acquisition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });

      const data: AgentResponse = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to analyze job description.");
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
          <Bot className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
            Lead Acquisition & Scoping
          </h2>
          <p className="text-sm text-slate-400 font-medium mt-1">
            Automatically scan, filter, and draft tailored proposals for frontend roles.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-210px)] pb-6">
        {/* Input Panel */}
        <div className="flex flex-col space-y-4 bg-[#0B0F19]/80 backdrop-blur-sm p-6 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.2)] border border-[#1E293B]/80 relative">
          <div className="flex items-center justify-between mb-2">
             <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest flex items-center">
                <span>Job Listing Source</span>
             </h3>
             <span className="text-xs font-mono text-blue-400 bg-blue-950/40 border border-blue-900/50 px-2 py-1 rounded-md">Input Stage</span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col flex-grow space-y-5">
            <textarea
              className="flex-grow w-full p-5 bg-[#030712]/50 border border-[#1E293B] rounded-2xl focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none resize-none font-mono text-sm leading-relaxed text-slate-300 transition-all placeholder:text-slate-600 shadow-inner"
              placeholder="e.g. Need a freelance React developer to build an interactive dashboard. The current app is slow and looks broken on mobile... ($50/hr)"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading || !jobDescription.trim()}
              className="group flex items-center justify-center w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-400/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin text-blue-100" />
                  Analyzing Listing Framework...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-3 text-blue-200 group-hover:text-white transition-colors" />
                  Run Analysis Engine
                </>
              )}
            </button>
          </form>

          <div className="bg-blue-950/30 border border-blue-900/40 rounded-2xl p-4 mt-auto">
            <h4 className="text-sm font-semibold text-blue-300 mb-1.5 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
              Freelance Job Details Explainer
            </h4>
            <p className="text-xs text-blue-100/60 leading-relaxed font-medium">
              This digital agent parses raw job descriptions to evaluate React/Next.js stack compatibility. It automatically translates non-technical client complaints into precise, engineering-first frontend solutions, drafting a tailored proposal ready for human review.
            </p>
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col bg-[#0B0F19]/80 backdrop-blur-sm p-6 rounded-3xl border border-[#1E293B]/80 shadow-[0_4px_30px_rgba(0,0,0,0.2)] overflow-hidden">
          <div className="flex items-center justify-between mb-6 shrink-0">
             <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest flex items-center">
                <span>Agent Output</span>
             </h3>
             <div className="flex items-center space-x-2 text-xs font-mono">
               {loading && <span className="text-blue-400 animate-pulse drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">Computing...</span>}
               {result && !loading && <span className="text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">Ready</span>}
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
                <Send className="w-12 h-12 mb-4 text-slate-700 stroke-[1.5]" />
                <p className="text-sm font-medium text-center max-w-[200px] text-slate-500">Awaiting listing data to formulate proposal strategy.</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                <div className="relative">
                   <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                   <Activity className="w-10 h-10 relative z-10 text-blue-400 animate-bounce drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                </div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] font-medium text-slate-500">Applying Guardrails...</p>
              </div>
            )}

            {result && !loading && (
              <div className="prose prose-invert prose-sm max-w-none prose-headings:font-semibold prose-a:text-blue-400 prose-pre:bg-[#030712]/80 prose-pre:border prose-pre:border-[#1E293B] prose-pre:text-slate-300 markdown-body">
                <Markdown>{result}</Markdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
