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
  RaindropsIcon,
  HumidityIcon,
  Container,
  ContentContainer,
  DetailsContainer,
  Title,
} from './ThreeDaysWeather.styled';

const ThreeDaysWeather = ({ forecastArr }) => {
  // const { name } = forecastArr.location;
  return (
    <Box as="div">
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
        {forecastArr.forecast.forecastday.map(
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
                <Box display="flex" justifyContent="center" marginBottom="40px">
                  <Container>
                    <ContentContainer>
                      <Title>{mintemp_c}</Title>
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
    </Box>
  );
};

export default ThreeDaysWeather;
