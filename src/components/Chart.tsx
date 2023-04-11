import { Order } from "@/api/baseApi";
import { useMemo } from "react";
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";

type Props = {
  asks: Order[];
  bids: Order[];
  name?: string;
};

export const Chart: React.FC<Props> = ({ asks, bids, name }) => {
  const data = useMemo(
    () => [
      ...bids.map(({amount, price}) => ({bid: amount, price})),
      {price: 0, bid: 0, ask: 0}, // make chart prettier
      ...asks.map(({amount, price}) => ({ask: amount, price})),
    ],
    [asks, bids]);

  return (
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <XAxis type="category" dataKey="price"/>
          <YAxis />
          <Tooltip labelFormatter={(d) => `price: ${d}`} />
          <Area dataKey="bid" fill="#66bb6a" stroke="#388e3c"/>
          <Area dataKey="ask" fill="#e57373" stroke="#d32f2f"/>
        </AreaChart>
      </ResponsiveContainer>
  )
}