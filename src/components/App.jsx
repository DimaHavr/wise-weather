import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Box from './Box';
import Loader from './Loader';
import 'modern-normalize/modern-normalize.css';
const SharedLayout = lazy(() => import('../components/SharedLayout'));
const Home = lazy(() => import('../pages/Home/Home'));
const Map = lazy(() => import('../pages/Map/Map'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export const App = () => {
  return (
    <Suspense
      fallback={
        <Box margin="0 auto">
          <Loader />
        </Box>
      }
    >
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/map" element={<Map />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
export default App;
