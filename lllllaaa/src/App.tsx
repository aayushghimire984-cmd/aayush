/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Home } from './pages/Home.tsx';
import { Login } from './pages/Login.tsx';
import { Dashboard } from './pages/Dashboard.tsx';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { UserProvider } from './context/UserContext';
import { NoticeProvider } from './context/NoticeContext';
import { SiteContentProvider } from './context/SiteContentContext';

const Layout = () => (
  <>
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default function App() {
  return (
    <SiteContentProvider>
      <NoticeProvider>
        <UserProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                </Route>
                <Route path="/login" element={<main className="flex-grow"><Login /></main>} />
                <Route path="/dashboard" element={<main className="flex-grow"><Dashboard /></main>} />
              </Routes>
            </div>
          </BrowserRouter>
        </UserProvider>
      </NoticeProvider>
    </SiteContentProvider>
  );
}

