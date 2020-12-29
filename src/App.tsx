import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import {theme} from "./context/CustomThemeProvider";
import {BrowserRouter as Router} from "react-router-dom"
import {useRoutes} from "./hooks/useRoutes";


function App() {
  let routes = useRoutes()

  return (
      <ThemeProvider theme={theme}>
        <Router>
          {routes}
        </Router>
      </ThemeProvider>
  );
}

export default App;

