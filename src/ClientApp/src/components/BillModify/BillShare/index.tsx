import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconLink from 'components/Menu/IconLink';
import { QRCodeSVG } from 'qrcode.react';

const BillShare = () => {
  const bill_id = (useParams().bill_id ?? ':0').slice(1);

  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: 'center', paddingTop: '15px' }}>
      <Typography component="h1" variant="h5" align="center" color="text.primary">
        You can use the following link to share your bill with your friends, or scan the QRCode
        below
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        <IconLink href={`/bill/join/:${bill_id}`} icon={`/bill/join/:${bill_id}`} />
        <QRCodeSVG value={window.location.href.replace(/\/join\/*/, `/share/${bill_id}`)} />
      </Typography>
    </Container>
  );
};

export default BillShare;
