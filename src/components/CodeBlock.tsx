import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import Icon from "@/components/Icon";

export type SyntaxLang = "python" | "typescript" | "go";

export interface CodeSnippet {
  lang: SyntaxLang;
  label: string;
  code: string;
}

// Syntax highlighter for light backgrounds — safe: code is hardcoded, not user input.
// Colors are a code-editor theme, intentionally separate from the brand tokens.
function highlight(raw: string, lang: SyntaxLang): string {
  const s = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Whole-line comments: return early so string/keyword regex can't corrupt the span attribute
  const trimmed = s.trimStart();
  if (lang === "python" && trimmed.startsWith("#")) {
    return `<span style="color:#6B7280;font-style:italic">${s}</span>`;
  }
  if ((lang === "typescript" || lang === "go") && trimmed.startsWith("//")) {
    return `<span style="color:#6B7280;font-style:italic">${s}</span>`;
  }

  let out = s;
  // strings
  out = out.replace(/("(?:[^"\\]|\\.)*")/g, '<span style="color:#0D9488">$1</span>');
  // keywords
  const kw =
    lang === "python"
      ? /\b(import|from|as|await|async|for|in|if|else|return|def|class|True|False|None)\b/g
      : lang === "typescript"
      ? /\b(import|from|export|const|let|var|await|async|new|for|of|do|while|if|else|return|true|false|null|undefined)\b/g
      : /\b(import|func|var|const|return|if|else|for|range|go|defer|type|struct|interface)\b/g;
  out = out.replace(kw, '<span style="color:#7C3AED">$1</span>');
  return out;
}

interface CodeBlockProps {
  /** One entry per language tab; the first is selected initially. */
  snippets: CodeSnippet[];
  className?: string;
}

/**
 * Code viewer with language tabs, a copy button, and line-numbered syntax
 * highlighting. Chrome uses the design tokens; the highlight palette is a
 * separate code-editor theme.
 */
const CodeBlock = ({ snippets, className = "" }: CodeBlockProps) => {
  const [active, setActive] = useState<SyntaxLang>(snippets[0].lang);
  const [copied, setCopied] = useState(false);

  const current = snippets.find((s) => s.lang === active) ?? snippets[0];
  const lines = current.code.split("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-black/[0.07] bg-white${className ? ` ${className}` : ""}`}
      style={{
        // Bespoke code-block shadow — no matching token.
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.05)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-3">
        {/* Language tabs */}
        <div className="flex items-center gap-0.5">
          {snippets.map(({ lang, label }) => (
            <button
              key={lang}
              onClick={() => setActive(lang)}
              className={`cursor-pointer rounded-md px-2.5 py-1 font-mono text-[12px] transition-all ${
                active === lang ? "bg-zinc-100 text-zinc-950" : "text-zinc-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={`flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1 font-sans text-[12.5px] transition-opacity hover:opacity-70 ${
            copied ? "text-brand-500" : "text-zinc-500"
          }`}
        >
          <Icon icon={copied ? Check : Copy} size={13} />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Code with line numbers */}
      <pre className="m-0 overflow-x-auto py-5 font-mono text-[13px] leading-[1.75]">
        {lines.map((line, i) => (
          <div key={i} className="flex px-5 hover:bg-black/[0.02] transition-colors">
            <span className="min-w-9 shrink-0 select-none pr-5 text-right text-[12px] text-zinc-300">
              {i + 1}
            </span>
            <span
              style={{ color: "#374151" }}
              dangerouslySetInnerHTML={{ __html: highlight(line, active) }}
            />
          </div>
        ))}
      </pre>
    </div>
  );
};

export default CodeBlock;
