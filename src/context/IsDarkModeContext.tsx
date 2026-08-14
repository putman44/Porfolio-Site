// src/context/IsDarkModeContext.tsx
import { createContext } from "react";

export interface ThemeContextType {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const IsDarkModeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export default IsDarkModeContext;
