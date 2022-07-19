// import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const BillJoin = () => {
  // const bill_id = parseInt((useParams().bill_id ?? ':0').slice(1));

  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: 'center', paddingTop: '15px' }}>
      <Typography component="h1" variant="h5" align="center" color="text.primary">
        TODO
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Lachlan, implement this
      </Typography>
    </Container>
  );
};

export default BillJoin;
