import { EthProvider } from "./contexts/EthContext";
import Dashboard from "./scenes/dashboard";
import Topbar from "./scenes/global/Topbar";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <EthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <main className="content">
            <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </EthProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
