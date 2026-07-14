const List = ({ items, renderItem, emptyMessage = 'No items found', className = '', getKey }) => {
  if (!items || items.length === 0) {
    return (
      <div
        className="p-4 text-center text-gray-500 text-sm border border-dashed border-gray-700 rounded-lg"
        role="status"
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <ul
      className={`divide-y divide-gray-700/50 border border-gray-700/50 rounded-lg overflow-hidden ${className}`}
    >
      {items.map((item, index) => (
        <li
          key={getKey ? getKey(item, index) : index}
          className="p-4 hover:bg-white/5 transition-colors"
        >
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
};

export default List;
