import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import ItemDetailsPage from './pages/ItemDetailsPage.jsx';
import ComingSoonPage from './pages/ComingSoonPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <>
      {/* Lets keyboard users jump past the navigation */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content" className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:id" element={<ItemDetailsPage />} />
          {/* Placeholders: replaced with real pages in Phase 3 */}
          <Route path="/cart" element={<ComingSoonPage title="Your Cart" />} />
          <Route path="/checkout" element={<ComingSoonPage title="Checkout" />} />
          <Route path="/confirmation" element={<ComingSoonPage title="Order Confirmation" />} />
          {/* Any other URL */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}