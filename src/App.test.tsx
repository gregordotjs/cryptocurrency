import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import axios from "axios";
import { store } from "app/store";
import App from "./App";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("testing InfoPanel component", () => {
  it("renders welcome message", () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({}));
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
