import { configureStore } from '@reduxjs/toolkit';
import breedsReducer from './breedsSlice';

export const store = configureStore({
  reducer: {
    breeds: breedsReducer,
  },
});
