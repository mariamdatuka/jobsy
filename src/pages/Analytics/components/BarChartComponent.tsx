import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarChartComponent = ({ chartData }: { chartData: any[] }) => {
  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={chartData}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="status" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="amount"
        fill="#82ca9d"
        activeBar={{ fill: "gold", stroke: "purple" }}
        radius={[10, 10, 0, 0]}
      />
    </BarChart>
  );
};

export default BarChartComponent;
