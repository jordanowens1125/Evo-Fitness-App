const Buttons = ({
  secondary,
  primary,
  secondaryFunction,
  primaryFunction,
  disabled = false,
  fullWidth = false,
}) => {
  const width = fullWidth ? "full-width" : "";
  return (
    <>
      {secondary && (
        <button
          onClick={secondaryFunction}
          aria-label={secondary}
          disabled={disabled}
          className={`secondary-button ${width}`}
        >
          {secondary}
        </button>
      )}

      {primary && (
        <button
          onClick={primaryFunction}
          aria-label={primary}
          disabled={disabled}
          className={`primary-button ${width}`}
          type="submit"
        >
          {primary}
        </button>
      )}
    </>
  );
};

export default Buttons;
