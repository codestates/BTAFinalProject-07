import { combineReducers } from 'redux';
import { api } from '@/api';
import networkSlice from '@/redux/slices/networkSlice';

const rootReducer = combineReducers({
  network: networkSlice,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
