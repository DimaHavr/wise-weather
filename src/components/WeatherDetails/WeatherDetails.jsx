import { Suspense, lazy } from 'react';
import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Box from 'components/Box';
import Loader from 'components/Loader';
import SearchBox from 'components/SearchBox';
const HourlyWeather = lazy(() => import('../../components/HourlyWeather'));
const ThreeDaysWeather = lazy(() =>
  import('../../components/ThreeDaysWeather')
);
const RealTimeWeather = lazy(() => import('../../components/RealTimeWeather'));

const WeatherDetails = () => {
  const [value, setValue] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputSubmit = value => {
    setSearchParams(value !== '' ? { query: value } : '');
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <Box>
      <Box
        as="header"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
        style={{
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '10px',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            style={{
              color: 'white',
            }}
            label="Real time"
            {...a11yProps(0)}
          />
          <Tab
            style={{
              color: 'white',
            }}
            label="24h weather"
            {...a11yProps(1)}
          />
          <Tab
            style={{
              color: 'white',
            }}
            label="Three days"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <SearchBox onSubmit={handleInputSubmit} />
      <Suspense fallback={<Loader />}>
        <Box as="main">
          <TabPanel value={value} index={0}>
            <RealTimeWeather query={query} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <HourlyWeather query={query} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ThreeDaysWeather query={query} />
          </TabPanel>
        </Box>
      </Suspense>
    </Box>
  );
};

export default WeatherDetails;
