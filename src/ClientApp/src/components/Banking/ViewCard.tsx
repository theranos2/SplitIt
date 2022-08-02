import { BankApi, CardDto } from 'api';
import { useEffect, useState } from 'react';
import { useAuthContext } from 'utility/hooks/useAuth';
import { Container } from './common';

export function ViewCardPage() {
  const { token } = useAuthContext();
  const [card, setCard] = useState<CardDto | undefined>();
  useEffect(() => {
    (async () => {
      const api = new BankApi({ apiKey: token });
      const res = await api.apiBankCardGet();
      setCard(res.data);
    })();
  }, []);
  return (
    <Container>
      <h1>Saved card details</h1>
      <h2>Card number: {card?.number}</h2>
      <h2>Expiry: {card?.expiry.toLocaleDateString()}</h2>
      <h2>Name: {card?.name}</h2>
      <h2>CVC: {card?.secret}</h2>
    </Container>
  );
}
