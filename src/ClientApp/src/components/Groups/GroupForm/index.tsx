import { LoadingButton } from '@mui/lab';
import { Alert, Button, IconButton, Stack, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AccountApi, GroupApi, UserApi, UserInfoDto } from 'api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useToken } from 'utility/hooks';
import { UserSelector } from 'components/Core';

export const GroupForm = () => {
  const [users, setUsers] = useState<UserInfoDto[]>([]);
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState<UserInfoDto[]>([]);
  const [owner, setOwner] = useState<UserInfoDto | undefined>();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const { data: currUser } = await getCurrentUser();
      const { data: userList } = await getUsers();
      setUsers(userList);
      const curUserRef = userList.find((u) => u.id === currUser.id);
      if (!curUserRef) {
        console.log('uh oh');
        return;
      }
      setOwner(curUserRef);
      setMembers([curUserRef]);
    })();
  }, []);

  const getUsers = async () => {
    const api = new UserApi({ apiKey: useToken() ?? '' });
    return api.apiUserGet();
  };

  const getCurrentUser = async () => {
    const api = new AccountApi({ apiKey: useToken() ?? '' });
    return api.apiAccountMeGet();
  };

  const submit = async () => {
    if (members.length <= 1) {
      setValidationError('Must include at least 1 more person besides yourself');
      return;
    }
    setLoading(true);
    const api = new GroupApi({ apiKey: useToken() ?? '' });
    try {
      const { status } = await api.apiGroupPost({
        name: groupName,
        memberIds: members.map((m) => m.id as string)
      });
      if (status === 200) setSubmitted(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const cause = (error.response?.data as any)?.errors?.[0] ?? 'Unknown';
        setValidationError(cause);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const onComplete = () => {
    console.log('DONE!');
    // TODO: redirect to wherever
  };

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <TextField label="Group name" onChange={(event) => setGroupName(event.target.value)} />
      {!owner ? (
        <LoadingButton loading variant="text" />
      ) : (
        <UserSelector onChange={setMembers} values={members} options={users} fixedUser={owner} />
      )}
      {!submitted ? (
        <LoadingButton
          disabled={!!validationError}
          variant="contained"
          loading={loading}
          onClick={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          Submit
        </LoadingButton>
      ) : (
        <Button onClick={() => onComplete()}>Return home</Button>
      )}
      {validationError && (
        <Alert
          sx={{ cursor: 'pointer' }}
          severity="error"
          onClick={() => setValidationError(undefined)}
          action={
            <IconButton>
              <CloseIcon />
            </IconButton>
          }
        >
          {validationError}
        </Alert>
      )}
    </Stack>
  );
};
