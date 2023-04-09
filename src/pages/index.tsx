import { baseApi, useGetApiOrderBookQuery } from "@/api/baseApi";
import { wrapper } from "@/store";
import Typography from "@mui/material/Typography";
import { GetServerSideProps } from "next";

const Home: React.FC = (props) => {
  const { data } = useGetApiOrderBookQuery({});

  return (
    <>
      <Typography className="text-white">  
        {data?.data?.currencyPair}
      </Typography>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store =>
   async () => {
      store.dispatch(baseApi.endpoints.getApiOrderBook.initiate({}));

      const result = await Promise.all(store.dispatch(baseApi.util.getRunningQueriesThunk()));

      return {props:{test:1}};
})

export default Home;