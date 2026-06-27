export type AgentWorkflow = "lead" | "audit" | "seo" | "unit-test" | "mobile-responsive";

export interface AgentResponse {
  result?: string;
  error?: string;
}
