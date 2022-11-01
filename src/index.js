import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { store } from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
<React.StrictMode>
  <Provider store={store}>{root.render(<App />)}</Provider>
</React.StrictMode>;
