import { Stack } from '@mui/material';
import { GroupForm } from '../GroupForm';

const GroupCreate = () => {
  return (
    <Stack
      spacing={3}
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8
      }}
    >
      <GroupForm />
    </Stack>
  );
};

export default GroupCreate;
