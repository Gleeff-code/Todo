import { Provider } from 'react-redux';
import { createStore } from './store';
import { ReactNode } from 'react';

const store = createStore();

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => <Provider store={store}>{children}</Provider>;
