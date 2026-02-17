import { Line, LineChart } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 400,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 300,
    pv: 4567,
    amt: 2400,
  },
  {
    name: "Page C",
    uv: 320,
    pv: 1398,
    amt: 2400,
  },
  {
    name: "Page D",
    uv: 200,
    pv: 9800,
    amt: 2400,
  },
  {
    name: "Page E",
    uv: 278,
    pv: 3908,
    amt: 2400,
  },
  {
    name: "Page F",
    uv: 189,
    pv: 4800,
    amt: 2400,
  },
];

const Analytics = () => {
  return (
    <LineChart
      width={600}
      height={400}
      style={{ aspectRatio: 1.618 }}
      responsive
      data={data}
    >
      <Line dataKey="uv" />
    </LineChart>
  );
};

export default Analytics;
