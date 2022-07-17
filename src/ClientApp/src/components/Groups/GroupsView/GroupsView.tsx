import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id: number, name: string, owner: string, members: string[]) {
  return { id, name, owner, members };
}

const rows = [
  createData(0, 'Minions fan club', 'Xibo', ['Adam']),
  createData(1, 'Lorem ipsum', 'Razin', ['Jingcheng', 'Ken']),
  createData(2, 'Dolor sit amet', 'Xibo', ['Xibo']),
  createData(3, 'Theranos2', 'Jingcheng', ['Lachlan', 'Razin', 'Ken', 'Xibo', 'Adam'])
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  return (
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
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell>{row.members.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
