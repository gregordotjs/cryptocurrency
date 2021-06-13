import { useAppSelector, useAppDispatch } from "app/hooks";
import { SortBy } from "app/enums";
import SortIcon from "components/SortIcon";
import { sortBy, getSort, currencies } from "../cryptocurrencySlice";

interface IHeadCell {
  label: string;
  sort: SortBy;
}

const useCreateHeadings = (): IHeadCell[] => {
  const { fiatMoney } = useAppSelector(currencies);
  return [
    {
      label: "Rank",
      sort: SortBy.CMC_RANK,
    },
    {
      label: "Symbol",
      sort: SortBy.SYMBOL,
    },
    {
      label: `Price in the fiat currency ${fiatMoney}`,
      sort: SortBy.PRICE,
    },
    {
      label: "24 hour change",
      sort: SortBy.CHANGE24H,
    },
  ];
};

const Header = () => {
  const selectedSortBy: SortBy = useAppSelector(getSort);
  const dispatch = useAppDispatch();
  const headings = useCreateHeadings();
  return (
    <thead>
      <tr>
        {headings.map(({ label, sort }: IHeadCell, index: number) => (
          <th key={index} className={sort === selectedSortBy ? "selected" : ""}>
            {label}
            <button type="button" aria-label="sort" onClick={(e) => dispatch(sortBy(sort))}>
              <SortIcon />
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
