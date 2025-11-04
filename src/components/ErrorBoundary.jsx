// src/components/ErrorBoundary.jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { err: null };
  }
  static getDerivedStateFromError(err) {
    return { err };
  }
  componentDidCatch(err, info) {
    // optionally log to an external service
    // console.error("Caught by ErrorBoundary:", err, info);
  }
  render() {
    if (this.state.err) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          background: "var(--bg)",
          color: "var(--text)",
          fontFamily: "Inter, system-ui, sans-serif"
        }}>
          <div style={{ maxWidth: 920 }}>
            <h1 style={{ marginTop:0 }}>Something went wrong</h1>
            <pre style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              background: "rgba(0,0,0,0.04)",
              padding: 12,
              borderRadius: 8,
              overflowX: "auto"
            }}>
{this.state.err && this.state.err.stack ? this.state.err.stack : String(this.state.err)}
            </pre>
            <p style={{ color: "var(--muted)" }}>
              Check the browser console and your build logs (npm run build). If this happened after a deploy, check Vercel build logs for "UNRESOLVED_IMPORT".
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
