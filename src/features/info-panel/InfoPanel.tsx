import { useAppSelector, useAppDispatch } from "app/hooks";
import {
  updateCurrencyAndRefresh,
  getCryptocurrenciesAsync,
  currencies,
} from "features/cryptocurrency/cryptocurrencySlice";
import { Currency } from "app/enums";
import { getLastRetrievedFromText } from "utils/formatting";
import RefreshIcon from "components/RefreshIcon";
import "./InfoPanel.scss";

export default function InfoPanel() {
  const { lastRetrieved, fiatMoney } = useAppSelector(currencies);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const element = event.target as HTMLSelectElement;
    dispatch(updateCurrencyAndRefresh(element.value as Currency));
  };

  return (
    <div className="content-panel">
      <div className="col-retrieved">
        Last retrieved: <span>{getLastRetrievedFromText(lastRetrieved)}</span>
      </div>

      <div className="col-refresh">
        <button
          className="refresh-icon-btn"
          onClick={(e) => dispatch(getCryptocurrenciesAsync())}
        >
          <RefreshIcon />
        </button>
      </div>

      <div className="col-fiat">
        <label htmlFor="fiatMoney">Fiat money</label>
        <select id="fiatMoney" onChange={handleChange} value={fiatMoney}>
          {Object.keys(Currency).map((currency: string) => (
            <option key={currency}>{currency}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
