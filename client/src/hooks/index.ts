import { AppThunk, AppDispatch, TRootState } from '../types/index';
import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook } from "react-redux";

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();