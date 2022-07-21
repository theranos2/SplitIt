import { Stack } from '@mui/material';
import { GroupForm } from '../GroupForm';
<<<<<<< HEAD:src/ClientApp/src/components/Groups/GroupCreate/index.tsx
import { InputProps } from '../GroupProps';

import { UserDto } from 'api/models';
import { GroupApi } from 'api';

const GroupCreate = () => {
  const [inputs, setInputs] = React.useState<InputProps>({ name: '', users: [] });
  const [selectedUsers, setSelectedUsers] = useState<UserDto[]>([]);

  const set = (name: string) => (input: any) => {
    name === 'users'
      ? input.forEach((e: number) => inputs['users'].push(e))
      : setInputs((old: InputProps) => ({ ...old, [name]: input.target.value }));
  };

  const submit = async (event: any) => {
    event.preventDefault();

    console.log(selectedUsers);
    const api = new GroupApi({ apiKey: window.localStorage.getItem('token') ?? '' });

    const memberIdsx = selectedUsers.map((x) => x.id ?? '');
    await api.apiGroupPost({ name: inputs.name, memberIds: memberIdsx });
  };

=======

const GroupCreate = () => {
>>>>>>> main:src/ClientApp/src/components/Groups/GroupCreate/GroupCreate.tsx
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
