import axios from "axios";
import { Currency } from "app/enums";
import { ICurrency, ICryptocurrencyResponse } from "app/interfaces";

export function fetchCryptocurrencies(
  currency: Currency
): Promise<ICryptocurrencyResponse> {
  return axios
    .get("/v1/cryptocurrency/listings/latest", {
      params: {
        convert: currency,
      },
      headers: {
        "X-CMC_PRO_API_KEY": process.env.REACT_APP_API_KEY,
      },
    })
    .then<ICryptocurrencyResponse>(({ data }) => {
      return {
        last_retrieved: data.status.timestamp,
        cryptocurrencies: data.data.map(
          ({ id, cmc_rank, symbol, quote }: ICurrency) => ({
            id,
            cmc_rank,
            symbol,
            price: quote[currency].price,
            percent_change_24h: quote[currency].percent_change_24h,
          })
        ),
      };
    });
}
