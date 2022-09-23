import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../config/cryptoApi';
import { cryptoNewsApi } from '../config/cryptoNewsApi';

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
});