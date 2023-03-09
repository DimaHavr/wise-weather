import Box from 'components/Box';

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

const RealTimeWeather = ({ forecastArr: { location, current } }) => {
  const { name, localtime } = location;
  const {
    condition,
    wind_kph,
    temp_c,
    pressure_mb,
    precip_mm,
    uv,
    humidity,
    feelslike_c,
  } = current;

  return (
    <Box as="div">
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
    </Box>
  );
};

export default RealTimeWeather;
