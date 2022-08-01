import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { BillDto } from 'api';
import { Context } from 'utility/Context';

const BillJoin = () => {
  const bill_id = (useParams().bill_id ?? ':0').slice(1);
  const [bill, setBill] = useState<BillDto>(null as unknown as BillDto);
  const [owner, setOwner] = useState<string>('');
  const history = useContext(Context)?.history;

  useEffect(() => {
    // get the bill from the backend
    setBill(bill_id as unknown as BillDto);
    // get the owner from the backend
    setOwner('nobody');
  }, []);

  const accept = () => {
    // accept the invitation in the backend
    history(`/bill/view/:${bill.id}`, { replace: true });
  };

  const decline = () => {
    // reject the invitation in the backend
    history('/', { replace: true });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: 'center', paddingTop: '15px' }}>
      <Typography component="h1" variant="h5" align="center" color="text.primary">
        You have been invited to the group: {bill.title} by {owner}
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
