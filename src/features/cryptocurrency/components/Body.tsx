import { ICryptocurrency } from "app/interfaces";
import { useAppSelector } from "app/hooks";
import { getCryptocurrencies } from "../cryptocurrencySlice";
import { formatCurrency, formatNumber } from "utils/formatting";
import "./Table.scss";

const CellPercentChange24h = ({ value }: { value: number }) => (
  <span className={value > 0 ? "green" :"red"}>{`${formatNumber(
    value,
    2
  )}%`}</span>
);

const Body = () => {
  const cryptocurrencies = useAppSelector(getCryptocurrencies);
  return (
    <tbody>
      {cryptocurrencies.map(
        ({
          id,
          cmc_rank,
          symbol,
          price,
          percent_change_24h,
        }: ICryptocurrency) => (
          <tr key={id} aria-label="table-row">
            <td>{cmc_rank}</td>
            <td>{symbol}</td>
            <td className="align-center">{formatCurrency(price)}</td>
            <td className="align-center">
              <CellPercentChange24h value={percent_change_24h} />
            </td>
          </tr>
        )
      )}
    </tbody>
  );
};

export default Body;
