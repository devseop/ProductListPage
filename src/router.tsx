import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import ListPage from "./pages/ListPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clubs" element={<ListPage />} />
        <Route path="/clubs/:clubId" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
