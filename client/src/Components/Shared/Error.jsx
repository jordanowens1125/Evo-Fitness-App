const Error = ({ error }) => {
  return (
    <div className="height-xs full-width">
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Error;
