import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { generateRandomColor } from "../../data/colors";

const Chart = ({ data, CustomTooltip, DataKey }) => {
  const randomColor = generateRandomColor();
  return (
    <div className="full-width full-height grow flex aic jcc body-color">
      <ResponsiveContainer height={400} width={"100%"}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={randomColor || "#8884d8"}
                stopOpacity={0.5}
              />
              <stop
                offset="90%"
                stopColor={randomColor || "#8884d8"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Legend verticalAlign="top" height={36} />
          <XAxis dataKey="date" tickLine={false} />
          <YAxis tickLine={false} />
          {/* <CartesianGrid strokeDasharray=".5 3" /> */}
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={CustomTooltip}
          />
          <Area
            type="monotone"
            dataKey={DataKey}
            stroke={randomColor || "#8884d8"}
            fillOpacity={1}
            fill="url(#colorUv)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
