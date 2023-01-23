import { useState } from 'react';
import { Wrapper, Input, Button, SearchIcon } from './SearchBox.styled';
import { Notify } from 'notiflix';

export const SearchBox = ({ onSubmit }) => {
  const [cityName, setCityName] = useState('');

  const handleSubmit = event => {
    if (cityName.trim() === '') {
      Notify.failure(
        'Sorry, there are no city name matching your search query. Please try again.'
      );
    }
    event.preventDefault();
    onSubmit(cityName);
    onReset(event);
  };

  const onChangeInput = event => {
    setCityName(event.target.value);
  };

  const onReset = event => {
    setCityName('');
    event.target.reset();
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Search city..."
        value={cityName}
        onChange={onChangeInput}
      />
      <Button type="submit">
        <SearchIcon />
      </Button>
    </Wrapper>
  );
};
export default SearchBox;
