import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IsDarkModeContext from "./context/IsDarkModeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  return (
    <IsDarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </IsDarkModeContext.Provider>
  );
};

export default App;
