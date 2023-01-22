import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  margin: 0 auto;
`;

export const Header = styled.header`
  position: fixed;
  padding: 25px 0;
  margin-bottom: 50px;
  width: 100%;
  background-color: #00000082;
  z-index: 100;
  text-align: center;
`;

export const Link = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 4px;
  text-transform: uppercase;
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover,
  :focus {
    transform: scale(1.05);
    color: orangered;
  }

  &.active {
    color: white;
    background: linear-gradient(#1b1b1b, #111);
    border: 1px solid #000;
    box-shadow: inset 0 0 0 1px #272727;
    :hover,
    :focus {
      transform: scale(1.05);
    }
  }
`;
