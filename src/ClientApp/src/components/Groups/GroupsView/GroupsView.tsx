import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Grid, Link, Paper } from '@mui/material';
import { GroupApi, SimpleGroupDto } from 'api';
import { token } from 'utility/config';

function createData(id: number, name: string, owner: string, members: string[]) {
  return { id, name, owner, members };
}

export default function GroupsView() {
  const handleRowClick = (group: any) => {
    console.log(group);
  };

  const [groups, SetGroups] = React.useState<SimpleGroupDto[]>([]);

  React.useEffect(() => {
    const api = new GroupApi({ apiKey: token });
    (async () => {
      const resp = await api.apiGroupGet();
      SetGroups(resp.data);
    })();
  }, []);

  console.log(groups);

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <React.Fragment>
          <Title>Your groups</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>No. members</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups.map((group) => (
                <TableRow
                  key={group.id}
                  onClick={() => handleRowClick(group)}
                  sx={{
                    '&.MuiTableRow-root:hover': {
                      cursor: 'pointer'
                    }
                  }}
                >
                  <TableCell>{group.name}</TableCell>
                  <TableCell>{group.owner?.firstName+' '+group.owner?.lastName}</TableCell>
                  <TableCell>{group.memberCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
        <Link color="primary" href="/groups" sx={{ mt: 3 }}>
          Go back
        </Link>
      </Paper>
    </Grid>
  );
}
