import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import Trilha from './pages/Trilha';
import TrilhaModule from './pages/TrilhaModule';
import TrilhaArticle from './pages/TrilhaArticle';
import NotFound from './pages/NotFound';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trilha" element={<Trilha />} />
            <Route path="/trilha/:moduleSlug" element={<TrilhaModule />} />
            <Route path="/trilha/:moduleSlug/:articleSlug" element={<TrilhaArticle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
