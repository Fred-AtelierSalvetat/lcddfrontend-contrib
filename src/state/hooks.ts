import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootStateType, AppDispatchType } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// TODOFSA, it works but does not seems to be the right way to do this => rework this
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
