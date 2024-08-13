import classNames from 'classnames';

const Button = ({ variant, className, children, ...rest }) => {
  return (
    <button
      type="button"
      className={classNames(className, 'hover:shadow-inner px-4 py-2 text-sm rounded-3xl', {
        'bg-[#F9A106] text-white hover:bg-[#e09d2b] hover:text-white': variant === 'primary',
        'bg-red-500 text-white hover:bg-red-700 hover:text-white': variant === 'secondary',
        'bg-white text-gray-900 hover:bg-white hover:text-blue-500': variant === 'light'
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;