import { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import SearchBarProps, { FilterProps, OrderProps } from './props';

const SearchBar = (props: SearchBarProps) => {
  const { items, currentItems, setCurrentItems, filters } = props;

  const [filter, setFilter] = useState<FilterProps>({ name: '', value: undefined });
  const [order, setOrder] = useState<OrderProps>({ name: '' });

  const checkFilter = (filter: FilterProps) => filters[filter.name];

  return (
    <>
      <TextField id="standard-bare" defaultValue="Bare" margin="normal" />
      <SearchIcon />
    </>
  );
};

export default SearchBar;
