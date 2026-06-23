import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;

// When react-snap has pre-rendered content into the HTML, hydrate it
// rather than mounting fresh — this preserves the pre-rendered DOM for crawlers.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
