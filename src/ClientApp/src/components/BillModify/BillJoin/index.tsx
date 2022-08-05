import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { DetailedBillDto, BillApi } from 'api';
import { useToken } from 'utility/hooks/useToken';

const BillJoin = () => {
  const bill_id = (useParams().bill_id ?? ':0').slice(1);
  const [bill, setBill] = useState<DetailedBillDto | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await new BillApi({ apiKey: useToken() ?? '' }).apiBillBillIdGet(bill_id);
      if (res.status === 200) {
        setBill(res.data);
      }
    })();
  }, []);

  const accept = async () => {
    const res = await new BillApi({ apiKey: useToken() ?? '' }).apiBillBillIdAcceptPost(bill_id);
    if (res.status === 200) {
      navigate(`/bill/view/:${bill?.id}`, { replace: true });
    }
  };

  const decline = async () => {
    const res = await new BillApi({ apiKey: useToken() ?? '' }).apiBillBillIdAcceptPost(bill_id);
    if (res.status === 200) {
      navigate('/', { replace: true });
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: 'center', paddingTop: '15px' }}>
      <Typography component="h1" variant="h5" align="center" color="text.primary">
        You have been invited to the group: {bill?.title} by {bill?.owner?.firstName ?? ''}
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        <Button variant="outlined" onClick={accept}>
          Accept
        </Button>
        <Button variant="outlined" onClick={decline}>
          Decline
        </Button>
      </Typography>
    </Container>
  );
};

export default BillJoin;
