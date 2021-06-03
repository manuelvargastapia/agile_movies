import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AuthDispatch } from './auth_store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAuthDispatch = () => useDispatch<AuthDispatch>();
export const useAuthSelector: TypedUseSelectorHook<RootState> = useSelector;
