import { emptySplitApi as api } from "./emptyApi";
export const addTagTypes = ["OrderBook"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getApiOrderBook: build.query<
        GetApiOrderBookApiResponse,
        GetApiOrderBookApiArg
      >({
        query: (queryArg) => ({
          url: `/api/OrderBook`,
          params: {
            Timestamp: queryArg.timestamp,
            CurrencyPair: queryArg.currencyPair,
          },
        }),
        providesTags: ["OrderBook"],
      }),
      getApiOrderBookAudit: build.query<
        GetApiOrderBookAuditApiResponse,
        GetApiOrderBookAuditApiArg
      >({
        query: () => ({ url: `/api/OrderBook/audit` }),
        providesTags: ["OrderBook"],
      }),
      getApiOrderBookCurrencyPair: build.query<
        GetApiOrderBookCurrencyPairApiResponse,
        GetApiOrderBookCurrencyPairApiArg
      >({
        query: () => ({ url: `/api/OrderBook/currency_pair` }),
        providesTags: ["OrderBook"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as baseApi };
export type GetApiOrderBookApiResponse =
  /** status 200 Success */ OrderBookDtoResult;
export type GetApiOrderBookApiArg = {
  timestamp?: string;
  currencyPair?: string;
};
export type GetApiOrderBookAuditApiResponse =
  /** status 200 Success */ StringDateTimeIEnumerableIDictionaryResult;
export type GetApiOrderBookAuditApiArg = void;
export type GetApiOrderBookCurrencyPairApiResponse =
  /** status 200 Success */ StringIEnumerableResult;
export type GetApiOrderBookCurrencyPairApiArg = void;
export type Order = {
  price?: number;
  amount?: number;
};
export type OrderBookDto = {
  timestamp?: string;
  currencyPair?: string | null;
  bids?: Order[] | null;
  asks?: Order[] | null;
};
export type OrderBookDtoResult = {
  isSuccess?: boolean;
  isFailure?: boolean;
  errorMessage?: string | null;
  errorCode?: string | null;
  data?: OrderBookDto;
};
export type StringDateTimeIEnumerableIDictionaryResult = {
  isSuccess?: boolean;
  isFailure?: boolean;
  errorMessage?: string | null;
  errorCode?: string | null;
  data?: {
    [key: string]: string[];
  } | null;
};
export type StringIEnumerableResult = {
  isSuccess?: boolean;
  isFailure?: boolean;
  errorMessage?: string | null;
  errorCode?: string | null;
  data?: string[] | null;
};
export const {
  useGetApiOrderBookQuery,
  useGetApiOrderBookAuditQuery,
  useGetApiOrderBookCurrencyPairQuery,
} = injectedRtkApi;
