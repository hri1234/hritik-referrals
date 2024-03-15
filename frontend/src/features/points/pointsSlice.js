import { createSlice } from '@reduxjs/toolkit';

const pointsSlice = createSlice({
  name: 'points',
  initialState: {
    value: 0,
  },
  reducers: {
    incrementPoints: (state) => {
      state.value += 5;
    },
  },
});

export const { incrementPoints } = pointsSlice.actions;

export default pointsSlice.reducer;