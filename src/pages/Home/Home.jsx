import { useSearchParams } from 'react-router-dom';
import { Suspense, lazy, useState } from 'react';
import Loader from 'components/Loader';
import Box from 'components/Box';
import SearchBox from 'components/SearchBox';

const WeatherTabPanel = lazy(() => import('../../components/WeatherTabPanel'));

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') ?? '');

  const handleInputSubmit = value => {
    setQuery(value);
    setSearchParams(value !== '' ? { query: value } : '');
  };

  return (
    <Box>
      <SearchBox onSubmit={handleInputSubmit} />
      <Suspense fallback={<Loader />}>
        <WeatherTabPanel query={query} />
      </Suspense>
    </Box>
  );
};

export default Home;
