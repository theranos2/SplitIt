import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import UserDisplay from 'components/Users/UserDisplay';
// import ItemDisplay from 'components/Users/ItemDisplay';
import IconLink from 'components/Menu/IconLink';

import { DetailedBillDto, BillApi } from 'api';
import { useToken } from 'utility/hooks';

import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const BillDetailed = () => {
  const bill_id = (useParams().bill_id ?? ':0').slice(1);
  const [bill, setBill] = useState<DetailedBillDto | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const res = await new BillApi({ apiKey: useToken() ?? '' }).apiBillBillIdGet(bill_id);
      if (res.status === 200) setBill(res.data);
    })();
  }, []);

  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: 'center', paddingTop: '15px' }}>
      <IconLink href={`/bill/edit/:${bill_id}`} icon={<EditIcon />} />
      <IconLink href={`/bill/share/:${bill_id}`} icon={<ShareIcon />} />
      <IconLink href={`/bill/delete/:${bill_id}`} icon={<DeleteIcon />} />
      <br />
      <Typography component="h1" variant="h2" align="center" color="text.primary">
        {bill?.title ?? 'unknown'}
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        ${bill?.total ?? '00'}.00
      </Typography>
      <LockOutlinedIcon />
      <Typography variant="h5" align="center" paragraph>
        Members
      </Typography>
      {/* <UserDisplay users={bill.users} removeUser={() => 0} /> */}
      {bill?.shares ? (
        <>
          <LockOutlinedIcon style={{ paddingTop: '20px' }} />
          <Typography variant="h5" align="center" paragraph>
            Items
          </Typography>
          {/* <ItemDisplay items={bill.shares} removeItem={() => 0} /> */}
        </>
      ) : (
        <></>
      )}
      <IconLink href={'/bill/view'} icon={'Back'} />
    </Container>
  );
};

export default BillDetailed;
