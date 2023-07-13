const Input = ({
  value,
  onChange,
  required = true,
  label,
  id,
  type = "text",
  content,
  placeholder,
  disabled = false,
  alignItems = false,
  max=50
}) => {
  const aic = alignItems ? "aic" : "";
  return (
    <>
      <div className={`flex-column full-width ${aic}`}>
        <label htmlFor={label}>{label}:</label>
        <div className="flex full-width gap-0 jcc">
          <input
            type={type}
            value={value}
            required={required}
            onChange={onChange}
            id={id}
            name={id}
            className="full-width"
            placeholder={placeholder}
            aria-label={label}
            disabled={disabled}
            max={max}
          ></input>
          {content}
        </div>
      </div>
    </>
  );
};

export default Input;
