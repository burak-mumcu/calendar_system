interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
  }
  
  export const Button: React.FC<ButtonProps> = ({ children, isLoading, ...props }) => {
    return (
      <button
        {...props}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Yükleniyor...' : children}
      </button>
    );
  };