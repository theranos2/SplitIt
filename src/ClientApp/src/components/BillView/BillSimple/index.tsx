import React from 'react';

interface BillSimpleProps {
  item: any;
}

const BillSimple = (props: BillSimpleProps) => {
  const { item } = props;
  console.log(item);

  return <></>;
};

export default BillSimple;
