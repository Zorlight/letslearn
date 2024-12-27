// Custom Tooltip Component
export const CustomTooltip = ({ active, payload, color = "#A855F7" }: any) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    return (
      <div
        style={{
          background: "#f3f4f6",
          border: "2px solid " + color,
          borderRadius: "8px",
          padding: "10px",
          boxShadow: "0px 2px 10px " + color + "50",
        }}
      >
        <p className="font-bold m-0">{name}</p>
        <p className="m-0">Value: {value}</p>
      </div>
    );
  }
  return null;
};
