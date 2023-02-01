import { Notify } from 'notiflix';
import { useState, useEffect } from 'react';

import { fetchWeather } from 'services/WeatherAPI';
import Box from 'components/Box';
import Loader from 'components/Loader';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/lazy';

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

const ThreeDaysWeather = ({ query }) => {
  const [cityName, setCityName] = useState([]);
  const [forecastArr, setForecastArr] = useState([]);
  const [preLoader, setPreLoader] = useState(false);
  const { name } = cityName;

  useEffect(() => {
    const getFetchWeather = async () => {
      setPreLoader(true);
      try {
        const data = await fetchWeather(query);
        setCityName(data.location);
        setForecastArr(data.forecast.forecastday);
        setPreLoader(false);
      } catch (error) {
        console.log(error);
        Notify.failure(
          'Sorry, there are no city matching your search query. Please try again.'
        );
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
        <Swiper
          modules={[Lazy, Navigation]}
          slidesPerView={1}
          initialSlide={0}
          navigation={true}
          loop={false}
          grabCursor={true}
          centeredSlides={true}
          spaceBetween={30}
        >
          {forecastArr.map(
            ({
              day: {
                condition,
                mintemp_c,
                maxtemp_c,
                maxwind_kph,
                avghumidity,
                totalprecip_mm,
              },
              date,
              date_epoch,
            }) => {
              return (
                <SwiperSlide key={date_epoch}>
                  <Box
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
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
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
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      )}
    </Box>
  );
};

export default ThreeDaysWeather;
