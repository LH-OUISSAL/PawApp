import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const fetchBreeds = createAsyncThunk('breeds/fetchBreeds', async () => {
  const response = await axiosInstance.post('/breeds', { type: 'dog' });
  return response.data.breeds;
});

const breedsSlice = createSlice({
  name: 'breeds',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBreeds.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBreeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default breedsSlice.reducer;
