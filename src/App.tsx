import React from "react";
import Router from "./router";
import reset from "./reset";
import { Global } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <Global styles={reset} />
        <Router />
      </QueryClientProvider>
    </React.Fragment>
  );
};

export default App;
