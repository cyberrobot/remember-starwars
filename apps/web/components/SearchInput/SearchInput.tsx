import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from '@mantine/core';
import { useState } from 'react';

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
    onChange(value);
  };

  return (
    <Autocomplete
      value={query}
      onChange={onChangeHandler}
      placeholder="Start typing to see results"
      data={data}
      {...rest}
    />
  );
};
