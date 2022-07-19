import { useParams } from 'react-router-dom';
import database from 'utility/database/database.json';

import { Bill } from '../../BillView/BillViewProps';

const BillEdit = () => {
  const bill_id = parseInt((useParams().bill_id ?? ':0').slice(1));
  const bill: Bill = database.bills.filter((e) => e.id === bill_id)[0]; // TODO: fetch from db

  console.log(bill);

  return <>TODO</>;
};

export default BillEdit;
