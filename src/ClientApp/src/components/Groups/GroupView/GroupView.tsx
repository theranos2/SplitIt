import * as React from 'react';
import { Container, createTheme, Link, ThemeProvider } from '@mui/material';
import { Title } from '@mui/icons-material';
import { GroupApi, GroupDto } from 'api';
import { useParams } from 'react-router-dom';
import { token } from 'utility/config';

const theme = createTheme();

export default function GroupView() {
  const { group_id } = useParams();
  if (group_id == undefined) {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Title>An error occured, please try again.</Title>
          <Link color="primary" href="/groups/view" sx={{ mt: 3 }}>
              Go back
          </Link>
        </Container>
      </ThemeProvider>
    );
  }

  let group_info = [];
  React.useEffect(() => {
    const api = new GroupApi({ apiKey: token });
    (async () => {
      const resp = await api.apiGroupGroupIdGet(group_id, undefined);
      let result = resp.data;
      let group_info = {
        'name': result.name,
        'owner': result.ownerId,
        'members': result.memberIds
      };
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Title>Viewing group</Title>
        <Link color="primary" href="/groups/view" sx={{ mt: 3 }}>
            Go back
        </Link>
      </Container>
    </ThemeProvider>
  );
}

