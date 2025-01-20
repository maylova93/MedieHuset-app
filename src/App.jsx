import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './MainLayout/MainLayout';
import { HomePage } from './pages/HomePage/HomePage';
import { EventsPage } from './pages/Events/EventsPage';
import { NewsDetails } from './components/NewsDetails/NewsDetails';
import { CampsPage } from './pages/Camps/CampsPage';
import { CampDetails } from './components/CampDetails/CampDetails';
import { InfoPage } from './pages/PraktiskInfo/InfoPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="forside" element={<HomePage />} />
          <Route path="news/:id" element={<NewsDetails />} />
          <Route path="events/:id" element={<EventsPage />} />
          <Route path="camps" element={<CampsPage />} />
          <Route path="camps/:id" element={<CampDetails />} />
          <Route path="/praktisk-info" element={<InfoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
