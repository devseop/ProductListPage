import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FetchingTest from "./pages/FetchingTest";
import DetailPage from "./pages/DetailPage";
import ListPage from "./pages/ListPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clubs" element={<ListPage />} />
        <Route path="/clubs/:clubId" element={<DetailPage />} />
        <Route path="/test" element={<FetchingTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
