import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Router from "./Router";
import { DataProvider } from "./DataProvider";

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <DataProvider>
        <Router />
      </DataProvider>
    </>
  );
}

export default App;
