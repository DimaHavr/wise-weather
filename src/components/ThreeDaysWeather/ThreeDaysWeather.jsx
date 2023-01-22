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
  //   WindIcon,
  //   TempCelsiusIcon,
  //   BarometerIcon,
  //   WindSlapIcon,
  //   RaindropsIcon,
  //   HumidityIcon,
  //   SunIcon,
  Container,
  ContentContainer,
  //   DetailsContainer,
  //   DetailsTitle,
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

  const renderSlides = currentCity.map(({ day, date }, index) => (
    <Box key={index} display="flex" justifyContent="center" marginBottom="40px">
      <Container>
        <ContentContainer>
          <Title>{name}</Title>
          <Box display="flex">
            <img src={day.condition.icon} alt="" />
            <p>{day.mintemp_c}</p>
          </Box>
          <TextItem>{day.condition.text}</TextItem>
          <TextItem>
            <TimeIcon /> {date}
          </TextItem>
        </ContentContainer>
      </Container>
    </Box>
  ));
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
