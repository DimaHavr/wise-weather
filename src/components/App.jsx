import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Box from './Box';
import Loader from './Loader';

const Home = lazy(() => import('../pages/Home/Home'));
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
        <Route index element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
export default App;
