import styled from 'styled-components';
import { IoMdTime } from 'react-icons/io';
import { GiWindsock, GiWindSlap } from 'react-icons/gi';
import { WiBarometer, WiRaindrops, WiHumidity } from 'react-icons/wi';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { BsFillSunFill } from 'react-icons/bs';

export const Container = styled.div`
  display: flex;
  cursor: grab;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 448px;
  height: 460px;
  background: linear-gradient(
    198deg,
    rgb(255 255 255 / 8%) 0%,
    rgb(255 255 255 / 12%) 100%
  );
  backdrop-filter: blur(25px);
  border-radius: 30px;
  @media (max-width: 450px) {
    border-radius: 0;
  }
`;

export const ContentContainer = styled.div`
  display: flex;

  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const DetailsContainer = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Title = styled.h2`
  font-weight: 500;
  text-transform: uppercase;
  font-size: 40px;
  line-height: 50px;
`;

export const DetailsTitle = styled.h3`
  left: 40px;
  position: absolute;
  top: 60%;
  width: 100%;

  &::before {
    content: '';
    border-top: 1px solid #fff;
    width: 82%;
    position: absolute;
    top: -10px;
  }
`;

export const TimeIcon = styled(IoMdTime)`
  width: 30px;
  height: 30px;
`;
export const WindIcon = styled(GiWindsock)`
  width: 30px;
  height: 30px;
`;

export const SunIcon = styled(BsFillSunFill)`
  width: 30px;
  height: 30px;
`;

export const HumidityIcon = styled(WiHumidity)`
  width: 30px;
  height: 30px;
`;

export const RaindropsIcon = styled(WiRaindrops)`
  width: 50px;
  height: 50px;
`;

export const WindSlapIcon = styled(GiWindSlap)`
  width: 30px;
  height: 30px;
`;

export const TempCelsiusIcon = styled(TbTemperatureCelsius)`
  width: 30px;
  height: 30px;
`;

export const BarometerIcon = styled(WiBarometer)`
  width: 30px;
  height: 30px;
`;

export const TextItem = styled.p`
  display: flex;
  font-weight: 500;
  font-size: 16px;
  align-items: center;
  gap: 5px;
`;
