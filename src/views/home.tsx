import { Order } from "@/api/baseApi";
import { Chart } from "@/components/Chart";
import Loader from "@/components/Loader";
import { Select } from "@/components/Select";
import { Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useMemo } from "react";

type InitialValues = {
  limit: number;
  currencyPair: string;
  timestamp?: string;
}

type Props = {
  isFetching: boolean;
  onSubmit: (values: InitialValues) => void
  auditData: { [key: string]: string[] };
  currencyPairs: string[];
  bids: Order[];
  asks: Order[];
};

export const HomeView : React.FC<Props> = ({isFetching, onSubmit, auditData, bids, asks, currencyPairs}) => {
  const formik = useFormik<InitialValues>({
    initialValues: {
      limit: 50,
      currencyPair: 'btceur',
    },
    onSubmit,
  });

  const timestamps = useMemo(() => {
    const times = auditData[formik.values.currencyPair] || [];

    return ['', ...times];
  }, [auditData, formik.values.currencyPair])

  return (
    <div className="h-screen">
      {isFetching && (<Loader />)}

      <form className="p-10 flex gap-5" onSubmit={formik.handleSubmit}>
        <Select
          label="Currency pair" 
          values={currencyPairs} 
          value={formik.values.currencyPair} 
          onChange={formik.handleChange} 
          name="currencyPair"
        />

        <Select
          label="Audit timestamp" 
          values={timestamps} 
          value={formik.values.timestamp} 
          onChange={formik.handleChange} 
          name="timestamp"
          renderValue={(time) => time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : 'Now'}
        />

        <TextField
          value={formik.values.limit} 
          onChange={formik.handleChange} 
          name="limit"
          label="Limit"
          className="w-40"
        />

        <Button type="submit" variant="outlined" className="w-40">
          Show
        </Button>
      </form>

      <div className="h-full flex p-10">
        <Chart data={bids} color="#8884d8" name="Bids"/>

        <Chart data={asks} color="#82ca9d" name="Asks"/>
      </div>
    </div>
  );
};
