import { useContext } from "react";
import IsDarkModeContext, { type ThemeContextType } from "./IsDarkModeContext";

export const useTheme = (): ThemeContextType => {
  const context = useContext(IsDarkModeContext);

  if (!context) {
    throw new Error("useTheme must be used within IsDarkModeContext.Provider");
  }

  return context;
};
