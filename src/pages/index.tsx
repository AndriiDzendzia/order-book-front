import {
  baseApi,
  GetApiOrderBookApiArg,
  useGetApiOrderBookAuditQuery,
  useGetApiOrderBookCurrencyPairQuery,
  useGetApiOrderBookQuery,
} from "@/api/baseApi";
import { wrapper } from "@/store";
import { HomeView } from "@/views/home";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [orderBookQuery, setOrderBookQuery] = useState<GetApiOrderBookApiArg>({})

  const { data, isFetching } = useGetApiOrderBookQuery(
    orderBookQuery,
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: orderBookQuery.timestamp ? 0 : 10000,
    });
  const { data: currencyData } = useGetApiOrderBookCurrencyPairQuery();
  const { data: auditData, refetch: refetchAudit } = useGetApiOrderBookAuditQuery();

  useEffect(() => {
    if (!isFetching && !orderBookQuery.timestamp) {
      refetchAudit();
    }
  }, [isFetching]);

  return (
    <HomeView
      isFetching={isFetching}
      auditData={auditData?.data || {}}
      currencyPairs={currencyData?.data || []}
      asks={data?.data?.asks || []}
      bids={data?.data?.bids || []}
      onSubmit={setOrderBookQuery}
    />
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store =>
   async () => {
      store.dispatch(baseApi.endpoints.getApiOrderBook.initiate({}));
      store.dispatch(baseApi.endpoints.getApiOrderBookCurrencyPair.initiate());
      store.dispatch(baseApi.endpoints.getApiOrderBookAudit.initiate());

      await Promise.all(store.dispatch(baseApi.util.getRunningQueriesThunk()));

      return {props:{}};
})

export default Home;