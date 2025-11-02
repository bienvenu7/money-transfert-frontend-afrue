import {
  addItem,
  addItemAsync,
  clearItems,
  decrement,
  fetchExampleData,
  increment,
  removeItem,
  removeItemAsync,
  selectExampleCount,
  selectExampleError,
  selectExampleItems,
  selectExampleLoading,
  selectExampleStats,
  setCount,
  useAppDispatch,
  useAppSelector,
} from '@/redux';
import React from 'react';

const ReduxExample: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectExampleCount);
  const items = useAppSelector(selectExampleItems);
  const isLoading = useAppSelector(selectExampleLoading);
  const error = useAppSelector(selectExampleError);
  const stats = useAppSelector(selectExampleStats);

  const handleFetchData = () => {
    dispatch(fetchExampleData({ limit: 3 }));
  };

  const handleAddItem = () => {
    const newItem = `Item ${Date.now()}`;
    dispatch(addItem(newItem));
  };

  const handleAddItemAsync = () => {
    const newItem = `Async Item ${Date.now()}`;
    dispatch(addItemAsync(newItem));
  };

  const handleRemoveItemAsync = (index: number) => {
    dispatch(removeItemAsync(index));
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h2>Redux Toolkit Example</h2>

      {/* Counter Section */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Counter: {count}</h3>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(setCount(0))}>Reset</button>
      </div>

      {/* Items Section */}
      <div style={{ marginBottom: '20px' }}>
        <h3>
          Items ({stats.totalItems}) - Has Items:{' '}
          {stats.hasItems ? 'Yes' : 'No'}
        </h3>
        <button onClick={handleAddItem}>Add Item (Sync)</button>
        <button onClick={handleAddItemAsync} disabled={isLoading}>
          Add Item (Async)
        </button>
        <button onClick={() => dispatch(clearItems())}>Clear All</button>
        <button onClick={handleFetchData} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Fetch Data'}
        </button>

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => dispatch(removeItem(index))}>
                Remove (Sync)
              </button>
              <button
                onClick={() => handleRemoveItemAsync(index)}
                disabled={isLoading}
              >
                Remove (Async)
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReduxExample;
