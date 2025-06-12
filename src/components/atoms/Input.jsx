const Input = ({ type = 'text', className, ...props }) => {
  return (
    <input
      type={type}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none ${className || ''}`}
      {...props}
    />
  );
};

export default Input;