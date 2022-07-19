import database from 'utility/database/database.json';
import ViewContainer from '../ViewContainer';

const BillsAll = () => {
  return <ViewContainer title="Bills" description="All of your bills" bills={database.bills} />;
};

export default BillsAll;
