import * as React from 'react';
import { Box, Container, createTheme, Link, ThemeProvider, Typography } from '@mui/material';
import { Title } from '@mui/icons-material';
import { GroupApi, UserInfoDto } from 'api';
import { DetailedGroupDto } from 'api/models/detailed-group-dto';
import { useParams } from 'react-router-dom';
import { useAuthContext } from 'utility/hooks/useAuth';

const theme = createTheme();

const error_page = () => (
  <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <Title>An error occured, please try again.</Title>
      <Link color="primary" href="/groups/view" sx={{ mt: 3 }}>
        Go back
      </Link>
    </Container>
  </ThemeProvider>
);

export default function GroupView() {
  const { group_id } = useParams();
  const { token } = useAuthContext();

  // Group id not found in URL parameter
  if (group_id === undefined) {
    return error_page();
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
  if (group === undefined) {
    return error_page();
  }

  // Initialise and populate group members array
  const members = group.members
    ? group?.members.map((m: UserInfoDto) => m.firstName + ' ' + m.lastName).join(', ')
    : [];

  return (
    <ThemeProvider theme={theme}>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6
        }}
      >
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
            {group.name}
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Owner: {group.owner?.firstName + ' ' + group.owner?.lastName}
            <br></br>
            Members: {members}
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
