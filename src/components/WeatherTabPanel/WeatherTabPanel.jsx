import { useState, useEffect, lazy, Suspense } from 'react';
import { Notify } from 'notiflix';
import { fetchWeather } from 'services/WeatherAPI';
import { Tab, Tabs } from '@mui/material';
import Box from 'components/Box';
import Loader from 'components/Loader';

const HourlyWeather = lazy(() => import('../HourlyWeather'));
const ThreeDaysWeather = lazy(() => import('../ThreeDaysWeather'));
const RealTimeWeather = lazy(() => import('../RealTimeWeather'));

function WeatherTabPanel({ query }) {
  const [value, setValue] = useState(0);
  const [preLoader, setPreLoader] = useState(false);
  const [forecastArr, setForecastArr] = useState(
    () => JSON.parse(window.localStorage.getItem('forecastArr')) ?? []
  );

  useEffect(() => {
    window.localStorage.setItem('forecastArr', JSON.stringify(forecastArr));
  }, [forecastArr]);

  useEffect(() => {
    const getFetchWeather = async () => {
      setPreLoader(true);
      try {
        const data = await fetchWeather(query);
        setForecastArr(data);
        setPreLoader(false);
      } catch (error) {
        console.log(error);
        Notify.failure(
          'Sorry, there are no city matching your search query. Please try again.'
        );
        setPreLoader(false);
      }
    };

    if (query) {
      getFetchWeather();
    }
  }, [query]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabStyles = {
    color: 'white',
  };

  return (
    <Box>
      <Box
        as="div"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
        style={{
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '10px',
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab style={tabStyles} label="Real time" />
          <Tab style={tabStyles} label="24h weather" />
          <Tab style={tabStyles} label="Three days" />
        </Tabs>
      </Box>
      {preLoader && <Loader />}
      {forecastArr && (
        <Suspense fallback={<Loader />}>
          <TabPanel value={value} index={0}>
            <RealTimeWeather forecastArr={forecastArr} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <HourlyWeather forecastArr={forecastArr} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ThreeDaysWeather forecastArr={forecastArr} />
          </TabPanel>
        </Suspense>
      )}
    </Box>
  );
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

export default WeatherTabPanel;
