import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Observable } from "rxjs";
import { InformationRes } from "../interfaces/information";
import { CurrencyPagination } from "../interfaces/pagination/currency-pagination";

@Injectable({ providedIn: "root" })
export class CurrencyService {
  private url: string = 'http://localhost:3000' + "/currencies";

  public constructor(private http: HttpClient) {}

  public getCurrencies(queryParams: Params): Observable<CurrencyPagination> {
    let url: string = this.url;

    const query: URLSearchParams = new URLSearchParams(queryParams);

    if ((query as URLSearchParams & { size: number }).size > 0) {
      url = url.concat("?", query.toString());
    }

    return this.http.get<CurrencyPagination>(url);
  }
}