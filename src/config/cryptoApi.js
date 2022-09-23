import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const cryptoApiHeaders = {
    'x-rapidapi-host': 'api.coinranking.com/v2',
    'x-rapidapi-key': 'coinranking05c7b314816a9ea38811ecb85a968e0e766f4ebb308f92ec',
  };

  const baseUrl = 'https://api.coinranking.com/v2';

  const createRequest = (url) => ({ url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => createRequest('/coins')
        })
    })
});

export const {
    useGetCryptosQuery,
} = cryptoApi;