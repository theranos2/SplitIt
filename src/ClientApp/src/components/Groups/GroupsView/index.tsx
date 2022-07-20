import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../GroupsTitle';
import { Grid, Link, Paper } from '@mui/material';

function createData(id: number, name: string, owner: string, members: string[]) {
  return { id, name, owner, members };
}

// TODO: Get groups from backend
const rows = [
  createData(0, 'Minions fan club', 'Xibo', ['Adam']),
  createData(1, 'Lorem ipsum', 'Razin', ['Jingcheng', 'Ken']),
  createData(2, 'Dolor sit amet', 'Xibo', ['Xibo']),
  createData(3, 'Theranos2', 'Jingcheng', ['Lachlan', 'Razin', 'Ken', 'Xibo', 'Adam'])
];

export default function GroupsView() {
  const [selectedRow, setSelectedRow] = React.useState({});
  console.log({ selectedRow });

  const handleRowClick = (row: any) => {
    const id = row.id;
    // open a bill view page using bill id
    // window.location.href = '/groups/view/' + id;
  };

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
                <TableCell>Members</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row)}
                  sx={{
                    '&.MuiTableRow-root:hover': {
                      cursor: 'pointer'
                    }
                  }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>{row.members.join(', ')}</TableCell>
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
