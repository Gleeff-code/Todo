import { combineSlices } from '@reduxjs/toolkit';
import { todoSlice } from './slices/todo/slice';

export const rootReducer = combineSlices(todoSlice).withLazyLoadedSlices();
