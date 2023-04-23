import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import RequireAuth from './components/auth/RequireAuth';
import { Suspense, lazy } from 'react';

const AdvertsPage = lazy(() => import('./components/adverts/AdvertsPage'));
const LoginPage = lazy(() => import('./components/auth/LoginPage'));
const NewAdvertPage = lazy(() => import('./components/adverts/NewAdvertPage'));
const AdvertPage = lazy(() => import('./components/adverts/AdvertPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/adverts/new"
            element={
              <RequireAuth>
                <NewAdvertPage />
              </RequireAuth>
            }
          />
          <Route path="/adverts" element={<AdvertsPage />} />
          <Route path="/adverts/:advertId" element={<AdvertPage />} />
          <Route path="/" element={<Navigate to="/adverts" />} />
          <Route path="/404" element={<div>404 | Not Found</div>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
