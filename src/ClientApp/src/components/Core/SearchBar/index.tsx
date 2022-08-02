import { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import SearchBarProps, { FilterProps } from './props';

const SearchBar = (props: SearchBarProps) => {
  const { items, setCurrentItems, filters } = props;

  const [filter, setFilter] = useState<FilterProps>({ name: '', value: undefined });

  const filterUsers = () => setCurrentItems(filters[filter.name](items, filter.value));

  return (
    <>
      <TextField
        id="standard-bare"
        value={filter.value}
        onChange={(e: any) => {
          setFilter((old: FilterProps) => {
            return { name: old.name, value: e.target.value };
          });
          filterUsers();
        }}
        margin="normal"
      />
      <SearchIcon />
      <InputLabel id="demo-simple-select-label">Filter type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filter.name}
        label="Select filter"
        onChange={(e: any) => setFilter({ name: e.target.value, value: '' })}
      >
        {Object.keys(filters).map((filter: string, idx: number) => (
          <MenuItem key={`filter-${idx}`} value={filter}>
            {filter}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SearchBar;
