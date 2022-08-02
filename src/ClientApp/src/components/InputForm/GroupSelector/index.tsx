import React from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

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
      setAllGroups(await fetch('/api/groups/').then((res) => res.json()));
    })();
  }, [group]);

  return (
    <>
      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId={`select-group-label`}
            id={`select-group-id`}
            value={group}
            label="Choose your group"
            onChange={setCurrentGroup}
            input={<OutlinedInput label={'Select a group'} />}
          >
            {allGroups.map((group: GroupDto, idx: number) => (
              <MenuItem key={`menuitem-group-${idx}`} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

// based on https://mui.com/material-ui/react-select/
