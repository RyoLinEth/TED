import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/style.css";
import "./assets/css/font-awesome-all.min.css";
import "./index.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-quill/dist/quill.snow.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
