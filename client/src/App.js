import React from "react";

// Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <h1>app</h1>
    </Provider>
  );
}

export default App;
