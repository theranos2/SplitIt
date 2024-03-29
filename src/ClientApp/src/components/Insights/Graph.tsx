import * as React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BillApi, SimpleBillDto } from 'api';
import { useAuthContext } from 'utility/hooks/useAuth';

export default function Graph() {
  const { token } = useAuthContext();
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

  const sorted_bills = groupBy(bills, (i) => i.owner?.firstName + ' ' + i.owner?.lastName);

  const bill_data = [];
  for (const key in sorted_bills) {
    bill_data.push({ name: key, y: sorted_bills[key].length });
  }

  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Bills by owner'
    },
    series: [
      {
        name: 'Number',
        data: bill_data
      }
    ]
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
