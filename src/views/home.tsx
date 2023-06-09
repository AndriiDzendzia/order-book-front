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
    <div className="h-screen flex flex-col">
      {isFetching && (<Loader />)}

      <form className="p-10 flex gap-5" onSubmit={formik.handleSubmit}>
        <Select
          label="Currency pair" 
          values={currencyPairs} 
          value={formik.values.currencyPair} 
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldValue('timestamp', timestamps[0]);
          }} 
          name="currencyPair"
        />

        <Select
          label="Audit timestamp" 
          values={timestamps} 
          value={formik.values.timestamp} 
          onChange={formik.handleChange} 
          name="timestamp"
          renderValue={() => formik.values.timestamp ? dayjs(formik.values.timestamp).format('YYYY-MM-DD HH:mm:ss') : ''}
          renderValues={(time) => time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : 'Now'}
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
      <Chart asks={asks} bids={bids}/>
    </div>
  );
};
