import { useState, useEffect } from 'react';
import ViewContainer from 'components/Core/ViewContainer';
import { BillDto } from 'api';

const BillsAll = () => {
  const [allBills, setAllBills] = useState<BillDto[]>([]);
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
        name: (old: BillDto[], value: any) => old.filter((e: BillDto) => e.title.includes(value)),
        minPrice: (old: BillDto[], value: any) => old.filter((e: BillDto) => e.total ?? 0 >= value),
        maxPrice: (old: BillDto[], value: any) => old.filter((e: BillDto) => e.total ?? 0 <= value)
      }}
    />
  );
};

export default BillsAll;
