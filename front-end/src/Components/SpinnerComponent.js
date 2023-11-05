function SpinnerComponent(props) {
  return (
    <div className="disabled-datepicker-placeholder">
      <div className="circle" style={{ position: "relative", zIndex: 1 }}>
        <svg width="325" height="240" viewBox="0 0 325 260">
          <path
            id="half-donut"
            d="M 162.5,120 m -75,0 a 75,75 0 1,0 150,0"
            fill="transparent"
          />
          <text fill="white">
            <textPath
              href="#half-donut"
              startOffset="50%"
              textAnchor="middle"
              style={{
                fontSize: "16px",
                fill: "white",
                fontWeight: "400",
              }} // Inline styles for JSX must be objects
            >
              Select Start Time To Begin
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}

export default SpinnerComponent;
