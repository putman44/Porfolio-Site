// src/App.tsx
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LeadGenChatbot from "./components/LeadGenChatbot";
import IsDarkModeContext from "./context/IsDarkModeContext";
import DevByTaylor from "./pages/DevByTaylor";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Relay from "./pages/Relay";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <IsDarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<DevByTaylor />} />
          <Route
            path="portfolio"
            element={
              <>
                <Home />
                <LeadGenChatbot />
              </>
            }
          />
          <Route path="relay" element={<Relay />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </IsDarkModeContext.Provider>
  );
};

export default App;
