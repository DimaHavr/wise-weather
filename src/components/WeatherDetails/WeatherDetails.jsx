// import PropTypes from 'prop-types';
import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import Box from 'components/Box';
import RealTimeWeather from 'components/RealTimeWeather';
import ThreeDaysWeather from 'components/ThreeDaysWeather';

const WeatherDetails = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        {value === index && (
          <Box sx={{ p: 3 }}>
            <>{children}</>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Box as="main">
      <Box
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
            label="Three days"
            {...a11yProps(1)}
          />
          <Tab
            style={{
              color: 'white',
            }}
            label="Rope access"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <RealTimeWeather />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ThreeDaysWeather />
      </TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
    </Box>
  );
};

export default WeatherDetails;
