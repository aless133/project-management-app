import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { TStoreDispatch } from 'store/store';
import type { TStoreState } from 'types';

export const useStoreSelector: TypedUseSelectorHook<TStoreState> = useSelector;
export const useStoreDispatch: () => TStoreDispatch = useDispatch;
