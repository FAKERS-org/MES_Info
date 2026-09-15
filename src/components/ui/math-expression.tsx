import React from "react";
import katex from "katex";

interface MathExpressionProps {
  children: string;
  displayMode?: boolean;
  throwOnError?: boolean;
}

export function MathExpression({ children, displayMode = false, throwOnError = false }: MathExpressionProps) {
  const [html, setHtml] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      setHtml(katex.renderToString(children, { displayMode, throwOnError }));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setHtml(children);
    }
  }, [children, displayMode, throwOnError]);

  if (error) {
    return <code className="font-mono text-xs text-destructive">{children}</code>;
  }

  return (
    <span
      className="katex"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
