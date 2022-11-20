import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import ListPage from "./pages/ListPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/club/:clubId" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
