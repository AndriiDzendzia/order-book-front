import { Order } from "@/api/baseApi";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

type Props = {
  data: Order[];
  color?: string;
  name: string;
};

export const Chart: React.FC<Props> = ({ data, color, name }) => {
  return (
    <ResponsiveContainer width="50%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
          
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="price"/>
          <YAxis />
          <Tooltip labelFormatter={(data) => `price: ${data}`} />
          <Legend formatter={() => name} />
          <Bar dataKey="amount" fill={color} />
        </BarChart>
      </ResponsiveContainer>
  )
}