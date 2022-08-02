import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BillDto } from 'api';

const BillEdit = () => {
  const bill_id = (useParams().bill_id ?? ':0').slice(1);
  const [bill, setBill] = useState<BillDto | undefined>(undefined);

  useEffect(() => {
    (async () => setBill(await fetch(`/api/Bill/${bill_id}`).then((res) => res.json())))();
  }, []);

  return <>TODO</>;
};

export default BillEdit;
