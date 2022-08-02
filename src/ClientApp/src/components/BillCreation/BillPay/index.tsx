import React from 'react';
import { useParams } from 'react-router-dom';

const BillPay: React.FunctionComponent = () => {
  const { bill_id } = useParams();

  return (
    <>
      <p>
        Ken{"'"}s test route
        {bill_id}
      </p>
    </>
  );
};

export default BillPay;
