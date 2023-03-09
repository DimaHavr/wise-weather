import Box from 'components/Box';
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

const HourlyWeather = ({ forecastArr }) => {
  const { name } = forecastArr.location;
  const [firstDay] = forecastArr.forecast.forecastday;
  return (
    <Box as="div">
      {forecastArr && (
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
          {firstDay.hour.map(
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
          )}
        </Swiper>
      )}
    </Box>
  );
};

export default HourlyWeather;
