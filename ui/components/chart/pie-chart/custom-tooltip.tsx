// Custom Tooltip Component for Pie Chart
export const CustomTooltip = ({ active, payload, total }: any) => {
  if (active && payload && payload.length) {
    const { name, value, color } = payload[0].payload;
    const percent = Math.round((value / total) * 100);
    return (
      <div
        style={{
          border: `2px solid ${color}`,
        }}
        className="bg-white rounded-lg p-2 shadow-md text-gray-500 text-sm font-bold"
      >
        <p style={{ color }}>{`${name} (${percent}%)`}</p>
        <p>Questions: {value}</p>
      </div>
    );
  }
  return null;
};
