// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchOneDayWeather } from 'services/WeatherAPI';
import Box from 'components/Box';
import SearchBox from 'components/SearchBox';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

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
} from './HourlyWeather.styled';

const HourlyWeather = () => {
  const [location, setLocation] = useState([]);
  const [currentCity, setCurrentCity] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const cityName = searchParams.get('query') ?? '';
  const { name } = location;

  useEffect(() => {
    const getFetchWeather = async () => {
      try {
        const data = await fetchOneDayWeather(cityName);
        setLocation(data.location);
        setCurrentCity(data.forecast.forecastday);
      } catch (error) {
        console.log(error);
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
  const renderSlides = currentCity.map(({ hour, date }, index) => {
    return hour.map(
      ({
        time,
        condition,
        temp_c,
        wind_kph,
        precip_mm,
        humidity,
        pressure_mb,
        uv,
        feelslike_c,
      }) => {
        console.log(time.slice(11, 16));
        return (
          <Box
            key={index}
            display="flex"
            justifyContent="center"
            marginBottom="40px"
          >
            <Container>
              <ContentContainer>
                <Title>{name}</Title>

                <ContentContainer>
                  <TextItem>
                    <TimeIcon /> {time}
                  </TextItem>
                  <Box display="flex">
                    <img src={condition.icon} alt="" />
                    <TextItem>
                      {temp_c}
                      <TempCelsiusIcon />
                    </TextItem>
                  </Box>
                  {/* <TextItem>{condition.text}</TextItem> */}
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
              </ContentContainer>
            </Container>
          </Box>
        );
      }
    );
  });

  return (
    <Box as="div">
      <SearchBox onSubmit={handleInputSubmit} />
      {name && (
        <Carousel
          showThumbs={false}
          emulateTouch={true}
          swipeable={true}
          showStatus={false}
          showIndicators={false}
          showArrows={false}
        >
          {renderSlides}
        </Carousel>
      )}
    </Box>
  );
};

export default HourlyWeather;
