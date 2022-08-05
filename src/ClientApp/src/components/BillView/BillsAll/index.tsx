import { useState, useEffect } from 'react';
import ViewContainer from 'components/Core/ViewContainer';
import { SimpleBillDto } from 'api';

import { BillApi } from 'api';
import { useToken } from 'utility/hooks';

const BillsAll = () => {
  const [allBills, setAllBills] = useState<SimpleBillDto[]>([]);

  useEffect(() => {
    (async () => {
      const res = await new BillApi({ apiKey: useToken() ?? '' }).apiBillGet();
      if (res.status === 200) setAllBills(res.data);
    })();
  }, []);

  return (
    <ViewContainer
      title="Bills"
      description="All of your bills"
      items={allBills}
      filters={{
        name: (old: SimpleBillDto[], value: any) =>
          old.filter((e: SimpleBillDto) => (e.title ? e.title.includes(value) : false)),
        minPrice: (old: SimpleBillDto[], value: any) =>
          old.filter((e: SimpleBillDto) => e.total ?? 0 >= value),
        maxPrice: (old: SimpleBillDto[], value: any) =>
          old.filter((e: SimpleBillDto) => e.total ?? 0 <= value)
      }}
    />
  );
};

export default BillsAll;
