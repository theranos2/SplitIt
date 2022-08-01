import { useState } from 'react';

import SearchBarProps, { FilterProps } from './props';

const SearchBar = (props: SearchBarProps) => {
  const [filter, setFilter] = useState<FilterProps>({ name: '' });
  const [order, setOrder] = useState<OrderProps>(() => );

  const checkFilter = (filter) => {
    return {

    }[filter.name]
  };
};

export default SearchBar;
