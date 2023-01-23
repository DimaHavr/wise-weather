import { Suspense, lazy } from 'react';
import Loader from 'components/Loader';
import Box from 'components/Box';

const WeatherDetails = lazy(() => import('../../components/WeatherDetails'));

const Home = () => {
  return (
    <Box>
      <Suspense fallback={<Loader />}>
        <WeatherDetails />
      </Suspense>
    </Box>
  );
};

export default Home;
