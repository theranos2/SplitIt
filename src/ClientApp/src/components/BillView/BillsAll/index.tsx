import React from 'react';

import ViewContainer from '../ViewContainer';
import { Bill } from '../BillViewProps';

const BillsAll = () => {
  const bills: Bill[] = [
    {
      id: 1,
      name: 'Rent money',
      price: 1000,
      users: [
        {
          id: 1,
          name: 'Iguana'
        },
        {
          id: 2,
          name: 'Lizard'
        },
        {
          id: 3,
          name: 'Kimodo-dragon'
        }
      ]
    },
    {
      id: 2,
      name: 'Dinner',
      price: 42000000,
      users: [
        {
          id: 1,
          name: 'Iguana'
        },
        {
          id: 2,
          name: 'Lizard'
        },
        {
          id: 4,
          name: 'Bill gates'
        }
      ]
    },
    {
      id: 3,
      name: 'Sushi Train',
      price: 17000,
      users: [
        {
          id: 5,
          name: 'Xibo'
        },
        {
          id: 6,
          name: 'Steve Jobs'
        },
        {
          id: 3,
          name: 'Kimodo-dragon'
        }
      ]
    }
  ];

  return <ViewContainer title="Bills" description="All of your bills" bills={bills} />;
};

export default BillsAll;
