import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<ListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
