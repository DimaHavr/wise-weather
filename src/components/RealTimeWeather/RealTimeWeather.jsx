import { Notify } from 'notiflix';
import { useState, useEffect } from 'react';
import { fetchWeather } from 'services/WeatherAPI';
import Box from 'components/Box';
import Loader from 'components/Loader';

import {
  TimeIcon,
  TextItem,
  WindIcon,
  TempCelsiusIcon,
  BarometerIcon,
  RaindropsIcon,
  HumidityIcon,
  SunIcon,
  Container,
  ContentContainer,
  DetailsContainer,
  Title,
} from './RealTimeWeather.styled';

const RealTimeWeather = ({ query }) => {
  const [cityName, setCityName] = useState([]);
  const [forecastArr, setForecastArr] = useState([]);
  const [preLoader, setPreLoader] = useState(false);
  const { name, localtime } = cityName;
  const {
    condition,
    wind_kph,
    temp_c,
    pressure_mb,
    precip_mm,
    uv,
    humidity,
    feelslike_c,
  } = forecastArr;

  useEffect(() => {
    const getFetchWeather = async () => {
      setPreLoader(true);
      try {
        const data = await fetchWeather(query);
        setCityName(data.location);
        setForecastArr(data.current);
        setPreLoader(false);
      } catch (error) {
        console.log(error);
        Notify.failure(
          'Sorry, there are no city matching your search query. Please try again.'
        );
        setCityName('');
        setPreLoader(false);
      }
    };
    if (!query) {
      return;
    }
    getFetchWeather();
  }, [query]);

  return (
    <Box as="div">
      {preLoader && <Loader />}
      {name && (
        <Box display="flex" justifyContent="center" paddingBottom="30px">
          <Container>
            <ContentContainer>
              <Title>{name}</Title>
              <TextItem>
                <TimeIcon /> {localtime}
              </TextItem>
              <Box display="flex">
                <img src={condition.icon} alt="" />
                <TextItem>
                  {temp_c} <TempCelsiusIcon />
                </TextItem>
              </Box>
              <TextItem>{condition.text}</TextItem>
            </ContentContainer>
            <DetailsContainer>
              <TextItem>
                <WindIcon /> {wind_kph}k/h
              </TextItem>
              <TextItem>
                <BarometerIcon />
                {pressure_mb}hPa
              </TextItem>
              <TextItem>
                <RaindropsIcon />
                {precip_mm}mm
              </TextItem>
              <TextItem>
                <HumidityIcon />
                {humidity}%
              </TextItem>
              <TextItem>
                RealFeel: {feelslike_c} <TempCelsiusIcon />
              </TextItem>
              <TextItem>
                <SunIcon />
                {uv} of 10
              </TextItem>
            </DetailsContainer>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default RealTimeWeather;
