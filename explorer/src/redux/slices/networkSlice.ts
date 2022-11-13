import { createSlice } from '@reduxjs/toolkit';

interface NetworkState {
  networkId: 'testnet' | 'localnet';
}

const initialState: NetworkState = {
  networkId: 'testnet',
};

const NetworkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetwork(state, action) {
      state.networkId = action.payload;
    },
  },
});

export const { setNetwork } = NetworkSlice.actions;
export default NetworkSlice.reducer;
