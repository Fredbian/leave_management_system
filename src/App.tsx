import { useMemo } from 'react';
import { themeSettings } from './theme';
import { createTheme } from '@mui/material/styles';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Dashboard from './pages/dashboard';


function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Dashboard />
            <Routes>
              {/* add routes here */}
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
