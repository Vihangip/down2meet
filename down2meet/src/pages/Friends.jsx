
import React from 'react';

function Friends() {
  const [sortOrder, setSortOrder] = useState('default');

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortedData = [...userData];

  if (sortOrder === 'availability') {
    sortedData.sort((a, b) => {
      return a.availability === b.availability ? 0 : a.availability ? -1 : 1;
    });
  } else if (sortOrder === 'busy') {
    sortedData.sort((a, b) => {
      return a.availability === b.availability ? 0 : a.availability ? 1 : -1;
    });
  }
}

export default Friends;