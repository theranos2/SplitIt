import * as React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import { BillApi, SimpleBillDto } from 'api';
import { token } from 'utility/config';

export default function Graph() {
  // Function to group bills by a given key
  const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
    arr.reduce((groups, item) => {
      (groups[key(item)] ||= []).push(item);
      return groups;
    }, {} as Record<K, T[]>);

  // API call to load bills from DB
  const [bills, SetBills] = React.useState<SimpleBillDto[]>([]);
  React.useEffect(() => {
    const api = new BillApi({ apiKey: token });
    (async () => {
      const resp = await api.apiBillGet();
      SetBills(resp.data);
    })();
  }, []);

  const sorted_bills = groupBy(bills, i => (i.owner?.firstName + ' ' + i.owner?.lastName));

  let bill_data = [];
  for (let key in sorted_bills) {
    bill_data.push({name: key, y: sorted_bills[key].length});
  }

  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Bills by owner'
    },
    series: [{
      name: 'Number',
      data: bill_data
    }]
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}


