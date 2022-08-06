import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconLink from 'components/Menu/IconLink';
import { QRCodeSVG } from 'qrcode.react';
import { UserInfoDto, BillApi, UserApi } from 'api';
import { useToken } from 'utility/hooks';
import { UserSelector } from 'components/Core/UserSelector';
import Button from '@mui/material/Button';

const BillShare = () => {
  const bill_id = (useParams().bill_id ?? ':0').slice(1);
  const [users, setUsers] = useState<UserInfoDto[]>([]);
  const [allUsers, setAllUsers] = useState<UserInfoDto[]>([]);

  useEffect(() => {
    (async () => {
      const bill = (await new BillApi({ apiKey: useToken() ?? '' }).apiBillBillIdGet(bill_id)).data;
      const new_users = bill.shares ? bill.shares.map((share) => share.payer) : [];
      setUsers(new_users as UserInfoDto[]);
      setAllUsers((await new UserApi({ apiKey: useToken() ?? '' }).apiUserGet()).data);
    })();
  }, []);

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
      <UserSelector values={users} onChange={setUsers} options={allUsers} />
      <Button>Submit</Button>
    </Container>
  );
};

export default BillShare;
