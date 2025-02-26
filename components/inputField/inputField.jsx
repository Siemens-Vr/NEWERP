const InputField = ({ label, type, value, onChange, placeholder }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium">{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border rounded"
        />
      </div>
    );
  };
  
  export default InputField;
  