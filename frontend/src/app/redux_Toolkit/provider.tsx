"use client";

import { Provider } from "react-redux";
import { store } from "./store/Store";

export function Providers({ children }: any) {
  return (
    <>
        <Provider store={store}>
          {children}
        </Provider>
    </>
  );
}
