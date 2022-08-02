import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { GroupDto } from 'api';
import GroupSelectorProps from './props';

export const GroupSelector = (props: GroupSelectorProps) => {
  const { group, setGroup } = props;

  const [allGroups, setAllGroups] = React.useState<GroupDto[]>([]);

  const setCurrentGroup = (event: any) =>
    setGroup(allGroups.filter((g: GroupDto) => g.id === event.target.value)[0]);

  /* TODO: actually fetch the users from the backend, rather than hardcode them */
  React.useEffect(() => {
    (async () => {
      setAllGroups(await fetch('localhost:5000/api/Group').then((res) => res.json()));
    })();
  }, [group]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={group}
      options={allGroups}
      onChange={setCurrentGroup}
      getOptionLabel={(group: GroupDto) => group.name}
      sx={{ width: 300 }}
      renderInput={(params: any) => <TextField {...params} label="Choose your group" />}
    />
  );
};
