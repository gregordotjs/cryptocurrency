import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { Currency, SortBy } from "app/enums";
import { ICryptocurrency, ICryptocurrencyResponse } from "app/interfaces";
import { RootState, AppThunk } from "app/store";
import { fetchCryptocurrencies } from "api/cryptocurrencyAPI";

export interface ICryptocurrencyState {
  cryptocurrencies: ICryptocurrency[];
  fiatMoney: Currency;
  lastRetrieved: string;
  sort: SortBy;
  status: "idle" | "loading" | "failed";
  errorMessage: string;
}

enum SortOrder {
  DESC,
  ASC,
}

interface IPropertyTypes {
  [key: string]: { type: string; sortOrder: SortOrder };
}

const propertyTypes: IPropertyTypes = {
  [SortBy.CMC_RANK]: { type: "number", sortOrder: SortOrder.ASC },
  [SortBy.SYMBOL]: { type: "text", sortOrder: SortOrder.ASC },
  [SortBy.PRICE]: { type: "number", sortOrder: SortOrder.DESC },
  [SortBy.CHANGE24H]: { type: "number", sortOrder: SortOrder.DESC },
};
const defaultSortProp = SortBy.CMC_RANK;
const defaultFiatMoney = Currency.EUR;
const initialState: ICryptocurrencyState = {
  cryptocurrencies: [],
  status: "idle",
  fiatMoney: defaultFiatMoney,
  sort: defaultSortProp,
  lastRetrieved: "",
  errorMessage: "",
};

export const getCryptocurrenciesAsync = createAsyncThunk(
  "cryptocurrency/fetchCryptocurrencies",
  async (_, { getState }) => {
    const {
      crypto: { fiatMoney },
    } = getState() as RootState;
    const response = await fetchCryptocurrencies(fiatMoney);
    return response;
  }
);

export const cryptocurrencySlice = createSlice({
  name: "cryptocurrency",
  initialState,
  reducers: {
    changeFiatCurrency: (state, action: PayloadAction<Currency>) => {
      state.fiatMoney = action.payload;
    },
    sortBy: (state, action: PayloadAction<SortBy>) => {
      if (state.sort === action.payload) {
        state.sort = defaultSortProp;
      } else {
        state.sort = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCryptocurrenciesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getCryptocurrenciesAsync.fulfilled,
        (
          state: ICryptocurrencyState,
          action: PayloadAction<ICryptocurrencyResponse>
        ) => {
          state.status = "idle";
          state.cryptocurrencies = action.payload.cryptocurrencies;
          state.lastRetrieved = action.payload.last_retrieved;
        }
      )
      .addCase(getCryptocurrenciesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message || "Unknown error";
      });
  },
});

export const { sortBy, changeFiatCurrency } = cryptocurrencySlice.actions;

// useAppSelector
export const currencies = (state: RootState) => state.crypto;

export const getCurrencies = (state: RootState) =>
  state.crypto.cryptocurrencies;
export const getSort = (state: RootState) => state.crypto.sort;

export const getCryptocurrencies = createSelector(
  [getCurrencies, getSort],
  (cryptocurrencies, sort) => {
    const { sortOrder, type } = propertyTypes[sort];
    return cryptocurrencies.slice().sort((a, b) => {
      const valueA = a[sort].toString();
      const valueB = b[sort].toString();
      switch (type) {
        case "number":
          const numberA = Number(valueA);
          const numberB = Number(valueB);
          return sortOrder === SortOrder.ASC
            ? numberA - numberB
            : numberB - numberA;
        default:
          return sortOrder === SortOrder.ASC
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
      }
    });
  }
);

export const updateCurrencyAndRefresh =
  (currency: Currency): AppThunk =>
  async (dispatch) => {
    dispatch(changeFiatCurrency(currency));
    dispatch(getCryptocurrenciesAsync());
  };

export default cryptocurrencySlice.reducer;
