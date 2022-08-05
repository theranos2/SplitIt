import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SimpleBillDto } from 'api';

const BillEdit = () => {
  const bill_id = (useParams().bill_id ?? ':0').slice(1);
  const [bill, setBill] = useState<SimpleBillDto | undefined>(undefined);

  useEffect(() => {
    (async () => setBill(await fetch(`/api/Bill/${bill_id}`).then((res) => res.json())))();
  }, []);

  return <>{bill?.title}</>;
};

export default BillEdit;
