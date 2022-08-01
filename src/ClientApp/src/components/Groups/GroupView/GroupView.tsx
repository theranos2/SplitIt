import * as React from 'react';
import { Container, createTheme, Link, ThemeProvider } from '@mui/material';
import { Title } from '@mui/icons-material';
import { DetailedGroupDto, GroupApi } from 'api';
import { useParams } from 'react-router-dom';
import { token } from 'utility/config';

const theme = createTheme();

export default function GroupView() {
  const { group_id } = useParams();

  // Group id not found in URL parameter
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

  // API call to load group from DB
  const [group, SetGroup] = React.useState<DetailedGroupDto>();
  React.useEffect(() => {
    const api = new GroupApi({ apiKey: token });
    (async () => {
      const resp = await api.apiGroupGroupIdGet(group_id, undefined);
      SetGroup(resp.data);
    })();
  }, []);

  // Error with group loading
  if (group == undefined) {
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

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Title>Viewing group {group.name}</Title>
        <Link color="primary" href="/groups/view" sx={{ mt: 3 }}>
            Go back
        </Link>
      </Container>
    </ThemeProvider>
  );
}

