// Custom Tooltip Component
export const CustomTooltip = ({
  active,
  payload,
  color = "#1db7c1",
  unit,
  type,
}: any) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    return (
      <div
        style={{
          background: "#f3f4f6",
          border: "2px solid " + `${color}`,
          borderRadius: "8px",
          padding: "10px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <p className="font-bold m-0">{name}</p>
        {type === "number" && <p className="m-0">{`${unit}: ${value}`}</p>}
        {type === "percent" && <p className="m-0">{`${unit}: ${value}%`}</p>}
      </div>
    );
  }
  return null;
};
