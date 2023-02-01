import axios from 'axios';

const fetchWeather = async cityName => {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: { q: `${cityName}`, days: '3' },
    headers: {
      'X-RapidAPI-Key': 'a05c4ca72amshd6999f2c5f785e3p10aaa3jsnfe5969edd877',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  const response = await axios(options);
  return response.data;
};

const fetchOneDayWeather = async cityName => {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: { q: `${cityName}`, days: '1' },
    headers: {
      'X-RapidAPI-Key': 'a05c4ca72amshd6999f2c5f785e3p10aaa3jsnfe5969edd877',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  const response = await axios(options);
  return response.data;
};

export { fetchWeather, fetchOneDayWeather };
