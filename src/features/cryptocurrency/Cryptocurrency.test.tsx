import {
  screen,
  render,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import { Provider } from "react-redux";
import axios from "axios";

import { store } from "app/store";
import Cryptocurrency from "./Cryptocurrency";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedData = {
  status: {
    timestamp: "2021-06-13T16:49:02.205Z",
  },
  data: [
    {
      id: 2,
      name: "Ethereum",
      symbol: "ETH",
      cmc_rank: 1,
      last_updated: "2021-06-13T16:48:02.000Z",
      quote: {
        EUR: {
          price: 1982.4356762703683,
          percent_change_24h: -0.16537615,
        },
      },
    },
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      cmc_rank: 2,
      last_updated: "2021-06-13T16:48:02.000Z",
      quote: {
        EUR: {
          price: 30632.33254350287,
          percent_change_24h: 3.8255702,
        },
      },
    },
    {
      id: 3,
      name: "Tether",
      symbol: "USDT",
      cmc_rank: 3,
      last_updated: "2021-06-13T16:47:10.000Z",
      quote: {
        EUR: {
          price: 0.8265436007511469,
          percent_change_24h: -0.70053836,
        },
      },
    },
  ],
};

const WithRedux = () => (
  <Provider store={store}>
    <Cryptocurrency />
  </Provider>
);

describe("testing Cryptocurrency component", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockedData });
  });

  it("Should call API once", () => {
    render(<WithRedux />);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("Should have loader visible and removed", async () => {
    render(<WithRedux />);
    expect(screen.getByRole(/progressbar/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByRole(/progressbar/i));
  });

  it("Should have BTC in table", async () => {
    render(<WithRedux />);
    await waitForElementToBeRemoved(() => screen.queryByRole(/progressbar/i));
    expect(screen.getByText(/BTC/i)).toBeInTheDocument();
  });

  it("Change sort order", async () => {
    render(<WithRedux />);
    await waitForElementToBeRemoved(() => screen.queryByRole(/progressbar/i));
    const sortBySymbolButton = screen.getAllByRole("button", {
      name: /sort/i,
    })[1];
    expect(screen.getAllByRole("row")[1]).toHaveTextContent(/eth/i);
    fireEvent.click(sortBySymbolButton);
    expect(screen.getAllByRole("row")[1]).toHaveTextContent(/btc/i);
  });
});
