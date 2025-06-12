const CategoryBadge = ({ category, className }) => {
  return (
    <span
      className={`text-xs px-2 py-1 rounded-full text-white font-medium ${className || ''}`}
      style={{ backgroundColor: category?.color || '#6B7280' }}
    >
      {category?.name || 'Uncategorized'}
    </span>
  );
};

export default CategoryBadge;