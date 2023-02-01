import { Notify } from 'notiflix';
import { useState, useEffect } from 'react';
import { fetchOneDayWeather } from 'services/WeatherAPI';
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
  BarometerIcon,
  RaindropsIcon,
  HumidityIcon,
  SunIcon,
  Container,
  ContentContainer,
  DetailsContainer,
  Title,
} from './HourlyWeather.styled';

const HourlyWeather = ({ query }) => {
  const [cityName, setCityName] = useState([]);
  const [preLoader, setPreLoader] = useState(false);
  const [forecastArr, setForecastArr] = useState(() => {
    return JSON.parse(window.localStorage.getItem('forecastArr')) ?? [];
  });
  const { name } = cityName;

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(forecastArr));
  }, [forecastArr]);

  useEffect(() => {
    const getFetchWeather = async () => {
      setPreLoader(true);
      try {
        const data = await fetchOneDayWeather(query);
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
          loop
          grabCursor={true}
          centeredSlides={true}
          spaceBetween={30}
        >
          {forecastArr.map(({ hour }) => {
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
                time_epoch,
              }) => {
                return (
                  <SwiperSlide key={time_epoch}>
                    <Box
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
                  </SwiperSlide>
                );
              }
            );
          })}
        </Swiper>
      )}
    </Box>
  );
};

export default HourlyWeather;
