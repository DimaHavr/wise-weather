import { Notify } from 'notiflix';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchWeather } from 'services/WeatherAPI';
import Box from 'components/Box';
import SearchBox from 'components/SearchBox';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Loader from 'components/Loader';

import {
  TimeIcon,
  TextItem,
  WindIcon,
  TempCelsiusIcon,
  RaindropsIcon,
  HumidityIcon,
  Container,
  ContentContainer,
  DetailsContainer,
  Title,
} from './ThreeDaysWeather.styled';

const ThreeDaysWeather = () => {
  const [location, setLocation] = useState([]);
  const [currentCity, setCurrentCity] = useState([]);
  const [preLoader, setPreLoader] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const cityName = searchParams.get('query') ?? '';
  const { name } = location;

  useEffect(() => {
    const getFetchWeather = async () => {
      setPreLoader(true);
      try {
        const data = await fetchWeather(cityName);
        setLocation(data.location);
        setCurrentCity(data.forecast.forecastday);
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
            <Box display="flex" flexDirection="column" alignItems="center">
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
      {preLoader && <Loader />}
      {name && (
        <Carousel
          showThumbs={false}
          emulateTouch={true}
          swipeable={true}
          showStatus={false}
          showArrows={true}
        >
          {renderSlides}
        </Carousel>
      )}
    </Box>
  );
};

export default ThreeDaysWeather;
