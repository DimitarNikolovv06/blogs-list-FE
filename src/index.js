import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, ColorModeProvider, theme } from "@chakra-ui/core";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <App />
        </ColorModeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
