import { Suspense, lazy } from 'react';
// import { Title } from './Home.styled';
import Loader from 'components/Loader';
import Box from 'components/Box';

const WeatherDetails = lazy(() => import('../../components/WeatherDetails'));

const Home = () => {
  return (
    <Box as="main" paddingTop="60px">
      <Suspense fallback={<Loader />}>
        <WeatherDetails />
      </Suspense>
    </Box>
  );
};

export default Home;
