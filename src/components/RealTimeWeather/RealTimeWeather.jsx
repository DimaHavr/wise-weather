import { Notify } from 'notiflix';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchWeather } from 'services/WeatherAPI';
import Box from 'components/Box';
import SearchBox from 'components/SearchBox';
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

const RealTimeWeather = () => {
  const [location, setLocation] = useState([]);
  const [currentCity, setCurrentCity] = useState([]);
  const [preLoader, setPreLoader] = useState(false);
  const { name, localtime } = location;
  const [searchParams, setSearchParams] = useSearchParams();
  const cityName = searchParams.get('query') ?? '';

  const {
    condition,
    wind_kph,
    temp_c,
    pressure_mb,
    precip_mm,
    uv,
    humidity,
    feelslike_c,
  } = currentCity;

  useEffect(() => {
    const getFetchWeather = async () => {
      setPreLoader(true);
      try {
        const data = await fetchWeather(cityName);
        setLocation(data.location);
        setCurrentCity(data.current);
        setPreLoader(false);
      } catch (error) {
        console.log(error);
        Notify.failure(
          'Sorry, there are no city matching your search query. Please try again.'
        );
        setPreLoader(false);
      }
    };
    if (!cityName) {
      return;
    }
    getFetchWeather();
  }, [cityName]);

  const handleInputSubmit = value => {
    setSearchParams(value !== '' ? { query: value } : '');
    setCurrentCity([]);
    setLocation([]);
  };

  return (
    <Box as="div">
      <SearchBox onSubmit={handleInputSubmit} />
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
