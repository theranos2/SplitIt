import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { SimpleGroupDto } from 'api';
import GroupSelectorProps from './props';

export const GroupSelector = (props: GroupSelectorProps) => {
  const { values, onChange, options } = props;
  const setCurrentGroup = (event: any) =>
    onChange(options?.filter((g: SimpleGroupDto) => g.id === event.target.value)[0]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={values}
      options={options ?? []}
      onChange={setCurrentGroup}
      getOptionLabel={(group: SimpleGroupDto) => group.name ?? ''}
      sx={{ width: 300 }}
      renderInput={(params: any) => <TextField {...params} label="Choose your group" />}
    />
  );
};
