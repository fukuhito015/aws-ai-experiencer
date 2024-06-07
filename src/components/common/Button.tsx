export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={`text-white h-10 px-4 leading-5 transform transition-colors duration-200 bg-teal-600 rounded hover:bg-teal-500 whitespace-nowrap focus:outline-none disabled:bg-gray-300 ${
        className || ''
      }`}
      type='button'
      {...props}
    >
      {children}
    </button>
  )
}
