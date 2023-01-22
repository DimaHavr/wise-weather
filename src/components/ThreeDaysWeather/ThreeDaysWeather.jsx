// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchWeather } from 'services/WeatherAPI';
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
  WindSlapIcon,
  RaindropsIcon,
  HumidityIcon,
  SunIcon,
  Container,
  ContentContainer,
  DetailsContainer,
  DetailsTitle,
  Title,
} from './ThreeDaysWeather.styled';

const ThreeDaysWeather = () => {
  const [location, setLocation] = useState([]);
  const [currentCity, setCurrentCity] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const cityName = searchParams.get('query') ?? '';
  const { name } = location;

  useEffect(() => {
    const getFetchWeather = async () => {
      try {
        const data = await fetchWeather(cityName);
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

  const renderSlides = currentCity.map(({ day, date }, index) => {
    const {
      condition,
      mintemp_c,
      maxtemp_c,
      maxwind_kph,
      avghumidity,
      totalprecip_mm,
    } = day;
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
            <TextItem>
              <TimeIcon /> {date}
            </TextItem>
            <Box>
              <img src={condition.icon} alt="" />
              <TextItem>{condition.text}</TextItem>
            </Box>
          </ContentContainer>
          <Box as="div" display="flex" style={{ gap: '15px' }}>
            <TextItem>
              Min: {mintemp_c}
              <TempCelsiusIcon />
            </TextItem>
            <TextItem>
              Max: {maxtemp_c}
              <TempCelsiusIcon />
            </TextItem>
          </Box>
          <DetailsContainer>
            <TextItem>
              <WindIcon /> max: {maxwind_kph}k/h
            </TextItem>
            <TextItem>
              <RaindropsIcon />
              {totalprecip_mm}mm
            </TextItem>
            <TextItem>
              <HumidityIcon />
              {avghumidity}%
            </TextItem>
          </DetailsContainer>
        </Container>
      </Box>
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
          showArrows={false}
        >
          {renderSlides}
        </Carousel>
      )}
    </Box>
  );
};

export default ThreeDaysWeather;
