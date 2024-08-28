import { Currency } from "../currency";
import { PaginationRes } from "./pagination";

export interface CurrencyPagination extends PaginationRes {
  numberOfCurrrency: number;
  currencies: Currency[];
}