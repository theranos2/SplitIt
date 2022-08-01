import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';

export interface IBillPayProp { }

const BillPay: React.FunctionComponent<IBillPayProp> = (props) => {
  const { bill_id }  = useParams();

  return (
    <>
      <p> 
        Ken's test route
        {bill_id}
      </p>
    </>
  )
};

export default BillPay;
