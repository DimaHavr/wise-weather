// import { Suspense, lazy } from 'react';
// import { Loader } from 'components/Loader';
// import { useState, useEffect } from 'react';
import Box from 'components/Box';

// const MoviesList = lazy(() => import('../../components/MoviesList'));

const Map = () => {
  return (
    <Box as="main" paddingTop="60px">
      <h1>Map</h1>
      {/* <Suspense fallback={<Loader />}>
        <MoviesList />
      </Suspense> */}
    </Box>
  );
};

export default Map;
