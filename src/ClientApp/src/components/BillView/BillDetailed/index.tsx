import { useParams } from 'react-router-dom';
import database from 'utility/database/database.json';

import UserDisplay from 'components/Users/UserDisplay';
import ItemDisplay from 'components/Users/ItemDisplay';

import { Bill } from '../BillViewProps';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';

const BillDetailed = () => {
  const bill_id = parseInt((useParams().bill_id ?? ':0').slice(1));
  const bill: Bill = database.bills.filter((e) => e.id === bill_id)[0]; // TODO: fetch from db

  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: 'center', paddingTop: '15px' }}>
      <Typography component="h1" variant="h2" align="center" color="text.primary">
        {bill.name}
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        ${bill.price}.00
      </Typography>
      <LockOutlinedIcon />
      <Typography variant="h5" align="center" paragraph>
        Members
      </Typography>
      <UserDisplay users={bill.users} removeUser={() => 0} />
      {bill.items ? (
        <>
          <Typography variant="h5" align="center" paragraph style={{ paddingTop: '15px' }}>
            Items
          </Typography>
          <ItemDisplay items={bill.items} removeItem={() => 0} />
        </>
      ) : (
        <></>
      )}
      {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
      </Box> */}
    </Container>
  );
};

export default BillDetailed;
