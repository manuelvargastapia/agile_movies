import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { MovieDispatch, RootState } from './movie_store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useMovieDispatch = () => useDispatch<MovieDispatch>();
export const useMovieSelector: TypedUseSelectorHook<RootState> = useSelector;
