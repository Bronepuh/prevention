import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "@pages/HomePage";
import AboutPage from "@pages/AboutPage";
import NotFoundPage from "@pages/NotFoundPage";
import MainLayout from "@shared/ui/main-layout/MainLayout";
import ContactsPage from "@pages/ContactsPage";
import DocsPage from "@pages/DocsPage";
import FaqPage from "@pages/FaqPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="contacts" element={<ContactsPage />} />
        </Route>
        <Route path="/about" element={<MainLayout />}>
          <Route index element={<AboutPage />} />
          <Route path="docs" element={<DocsPage />} />
          <Route path="faq" element={<FaqPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
