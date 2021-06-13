import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { getCryptocurrenciesAsync, currencies } from "./cryptocurrencySlice";
import Loader from "components/Loader";
import ErrorMessage from "components/Error";
import Table from "./components/Table";

export default function Cryptocurrency() {
  const { status, errorMessage } = useAppSelector(currencies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCryptocurrenciesAsync());
  }, [dispatch]);

  if (status === "loading") return <Loader />;

  if (status === "failed") return <ErrorMessage message={errorMessage} />;

  return (
    <Table>
      <Table.Header />
      <Table.Body />
    </Table>
  );
}
