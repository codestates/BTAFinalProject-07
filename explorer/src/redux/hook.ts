import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from '@/redux/rootReducer';
import store from '@/redux/store';

export type RootReducerType = ReturnType<typeof rootReducer>;
export type DispatchType = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector;
