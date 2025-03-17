import { createRoot } from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css"; // Импортируем стили Ant Design
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
