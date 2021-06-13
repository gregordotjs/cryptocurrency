import { render, screen } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import axios from "axios";
import InfoPanel from "./InfoPanel";
import configureMockStore from "redux-mock-store";
import { ICryptocurrencyState } from "features/cryptocurrency/cryptocurrencySlice";
import { Currency, SortBy } from "app/enums";
import * as redux from "react-redux";

const mockData: ICryptocurrencyState = {
  cryptocurrencies: [],
  errorMessage: "",
  fiatMoney: Currency.EUR,
  lastRetrieved: "2021-06-13T16:47:10.000Z",
  sort: SortBy.CMC_RANK,
  status: "idle",
};
const spy = jest.spyOn(redux, "useSelector");
const mockStore = configureMockStore();

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("testing InfoPanel component", () => {
  beforeEach(() => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({}));
    spy.mockImplementation(() => mockData);
  });

  it("should render the correct hour", () => {
    render(
      <Provider store={mockStore(mockData)}>
        <InfoPanel />
      </Provider>
    );
    expect(screen.getByText(/13. 06. 2021/i)).toBeInTheDocument();
  });
});
