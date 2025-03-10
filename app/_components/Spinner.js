'use client';

function Spinner({ size }) {
  return (
    <div
      className="spinner"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    ></div>
  );
}
export default Spinner;
