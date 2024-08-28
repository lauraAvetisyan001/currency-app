import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Currency } from '../../shared/interfaces/currency';
import { CurrencyService } from '../../shared/services/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss',
})
export class CurrencyComponent implements OnInit {
  private destroy$: Subject<void> = new Subject();

  public currencies!: Currency[];

  private limit: number = 13;
  private maxPage: number = 1;
  private currentPage: number = 1;

  public search_text!: string;

  private queryParams: Params = {};

  public constructor(
    private route: ActivatedRoute,
    private currencyService: CurrencyService
  ) {}

  public ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.queryParams = { ...params };
        this.queryParams['limit'] = this.limit;

        if (!params['search_text']) {
          this.search_text = '';
          delete this.queryParams['search_text'];
        } else {
          this.search_text = params['search_text'];
        }

        this.getCurrencies();
      });
  }

  public getCurrencies(): void {
    if (this.search_text) {
      this.queryParams['search_text'] = this.search_text;
    }

    this.currencyService
      .getCurrencies(this.queryParams)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.currencies = data.currencies;
        this.currentPage = data.currentPage;
        this.maxPage = data.maxPage;
        this.limit = data.limit;
      });
  }

  public loadMoreCurrencies(): void {
    if (this.currentPage < this.maxPage) {
      this.currentPage++;

      this.currencyService
        .getCurrencies({
          ...this.queryParams,
          limit: this.limit,
          page: this.currentPage,
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.maxPage = data.maxPage;
          this.currentPage = data.currentPage;
          this.currencies = this.currencies.concat(...data.currencies);
        });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}