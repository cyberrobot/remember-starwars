import {
  ActionIcon,
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
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

  const onResetHandler = () => {
    setQuery('');
    onChange('');
  };

  return (
    <Autocomplete
      value={query}
      onChange={onChangeHandler}
      onItemSubmit={onItemSubmitHandler}
      onKeyUp={onSubmitHandler}
      placeholder="Start typing to see results"
      data={query.length > 0 ? data : []}
      rightSection={
        <ActionIcon variant="subtle">
          <IconX onClick={onResetHandler} />
        </ActionIcon>
      }
      {...rest}
    />
  );
};
