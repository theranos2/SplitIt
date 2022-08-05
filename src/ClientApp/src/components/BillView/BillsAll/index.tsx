import { useState, useEffect } from 'react';
import ViewContainer from 'components/Core/ViewContainer';
import { SimpleBillDto } from 'api';

const BillsAll = () => {
  const [allBills, setAllBills] = useState<SimpleBillDto[]>([]);
  useEffect(() => {
    (async () => {
      setAllBills(await fetch('google.com').then((res) => res.json()));
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
