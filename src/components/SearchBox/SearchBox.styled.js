import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';

export const Wrapper = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 20px;
  position: relative;
  z-index: 1;
`;

export const Input = styled.input`
  display: flex;
  justify-content: center;
  padding: 10px;
  align-items: center;
  width: 300px;

  letter-spacing: 1.4px;
  color: rgba(255, 255, 255, 0.621);
  border-color: rgba(255, 255, 255, 0.679);
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  @media screen and (max-width: 767px) {
    max-width: 200px;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: none;
  color: rgba(255, 255, 255, 0.621);
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes btn-animation {
    0% {
      transform: scale(1.05);
    }
    20% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1.13);
    }
  }
  :active {
    animation: btn-animation 1s ease-out;
  }
`;

export const SearchIcon = styled(BsSearch)`
  width: 30px;
  height: 30px;
`;
