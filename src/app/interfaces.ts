export interface ICurrency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: Date;
  tags: string[];
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  platform?: any;
  cmc_rank: number;
  last_updated: Date;
  quote: IQuote;
}

export interface IQuote {
  [key: string]: IQuoteInfo;
}

export interface IQuoteInfo {
  price: number;
  volume_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  last_updated: Date;
}

export interface ICryptocurrency {
  id: number;
  cmc_rank: number;
  symbol: string;
  price: number;
  percent_change_24h: number;
}

export interface ICryptocurrencyResponse {
  last_retrieved: string;
  cryptocurrencies: ICryptocurrency[];
}
