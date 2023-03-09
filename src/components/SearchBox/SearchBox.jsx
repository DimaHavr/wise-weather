import { useState } from 'react';
import { Wrapper, Input, Button, SearchIcon } from './SearchBox.styled';
import { Notify } from 'notiflix';

export const SearchBox = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    if (query.trim() === '') {
      Notify.failure(
        'Sorry, there are no city name matching your search query. Please try again.'
      );
      return;
    }
    event.preventDefault();
    onSubmit(query);
    onReset(event);
  };

  const onChangeInput = event => {
    setQuery(event.target.value);
  };

  const onReset = event => {
    setQuery('');
    event.target.reset();
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={onChangeInput}
      />
      <Button type="submit">
        <SearchIcon />
      </Button>
    </Wrapper>
  );
};
export default SearchBox;
