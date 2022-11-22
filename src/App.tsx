import React from "react";
import Router from "./router";
import reset from "./reset";
import { Global } from "@emotion/react";

const App = () => {
  return (
    <React.Fragment>
      <Global styles={reset} />
      <Router />
    </React.Fragment>
  );
};

export default App;
