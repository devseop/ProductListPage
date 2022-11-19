import React from "react";
import Router from "./router";
import reset from "./reset";
import { Global } from "@emotion/react";

const App = () => {
  return (
    <>
      <Global styles={reset} />
      <Router />
    </>
  );
};

export default App;
