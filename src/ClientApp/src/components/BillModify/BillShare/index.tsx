import { useParams } from 'react-router-dom';
import { encode } from 'base-64';

const BillShare = () => {
  const bill_id = parseInt((useParams().bill_id ?? ':0').slice(1));

  return (
    <>
      You can use the following link to share your bill with your friends
      {`'/bill/share/${encode(bill_id.toString())}'`}
    </>
  );
};

export default BillShare;
