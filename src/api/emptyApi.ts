import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import queryString from 'query-string';

import environment from '../util/environment';

// initialize an empty api service that we'll inject endpoints into later as needed
// eslint-disable-next-line
export const emptySplitApi = createApi({
  reducerPath: 'chef',
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiUrl,
    paramsSerializer: (params) =>
      queryString.stringify(params, { sort: false }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }

    return undefined;
  },
  endpoints: () => ({}),
});
