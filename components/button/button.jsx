const Button = ({ text, onClick, type = "button", className }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${className}`}
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  