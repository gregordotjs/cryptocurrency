import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cryptocurrencySlice from "../features/cryptocurrency/cryptocurrencySlice";

export const store = configureStore({
  reducer: {
    crypto: cryptocurrencySlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
