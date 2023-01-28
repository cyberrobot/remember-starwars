import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from '@mantine/core';
import { KeyboardEvent, useState } from 'react';

type SearchInputProps = {
  data: AutocompleteItem[];
  onChange: (value: string) => void;
};

export const SearchInput = ({
  data,
  onChange,
  ...rest
}: SearchInputProps & AutocompleteProps) => {
  const [query, setQuery] = useState('');

  const onChangeHandler = (value: string) => {
    setQuery(value);
  };

  const onItemSubmitHandler = (item: AutocompleteItem) => {
    onChange(item.value);
  };

  const onSubmitHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onChange(query);
    }
  };

  return (
    <Autocomplete
      value={query}
      onChange={onChangeHandler}
      onItemSubmit={onItemSubmitHandler}
      onKeyUp={onSubmitHandler}
      placeholder="Start typing to see results"
      data={query.length > 0 ? data : []}
      {...rest}
    />
  );
};
