import { format, parseISO } from "date-fns";
const DATE_FORMAT = "dd. MM. Y, 'at ' HH:mm.ss";

export const formatNumber = (value: number, decimals: number | null = null) =>
  decimals === null ? value : value.toFixed(decimals);
export const formatCurrency = (value: number) =>
  new Intl.NumberFormat().format(value);
export const getLastRetrievedFromText = (value: string) =>
  value ? format(parseISO(value), DATE_FORMAT) : "";
