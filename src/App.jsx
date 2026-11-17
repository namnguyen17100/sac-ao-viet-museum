import { useEffect, useState } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import SearchModal from './components/SearchModal.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ArtifactDetailPage from './pages/ArtifactDetailPage.jsx';
import CollectionPage from './pages/CollectionPage.jsx';
import GalleryRoomsPage from './pages/GalleryRoomsPage.jsx';
import HomePage from './pages/HomePage.jsx';
import SourcesPage from './pages/SourcesPage.jsx';
import TimelinePage from './pages/TimelinePage.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export default function App() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#fff8f5] text-[#1e1b18]">
        <Header onOpenSearch={() => setSearchModalOpen(true)} />
        <main className="flex-1 pt-16 md:pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phong-trung-bay" element={<GalleryRoomsPage />} />
            <Route path="/phong-trung-bay/:roomSlug" element={<GalleryRoomsPage />} />
            <Route path="/bo-suu-tap" element={<CollectionPage />} />
            <Route path="/bo-suu-tap/:code" element={<ArtifactDetailPage />} />
            <Route path="/dong-thoi-gian" element={<TimelinePage />} />
            <Route path="/nguon-va-ban-quyen" element={<SourcesPage />} />
            <Route path="/gioi-thieu" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
        />
      </div>
    </HashRouter>
  );
}
