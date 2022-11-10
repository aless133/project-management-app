import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { TStoreDispatch } from 'store/store';
import type { IStoreState } from 'types';

export const useStoreSelector: TypedUseSelectorHook<IStoreState> = useSelector;
export const useStoreDispatch: () => TStoreDispatch = useDispatch;
