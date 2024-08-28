import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';

@Component({
  selector: 'app-currency-search',
  templateUrl: './currency-search.component.html',
  styleUrl: './currency-search.component.scss',
})
export class CurrencySearchComponent implements OnInit {
  public search_text!: string;

  public constructor(private router: Router, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.search_text = this.route.snapshot.queryParams['search_text'];
  }

  public onSearchChange(): void {
    const query: Params = {};

    if (this.search_text) {
      query['search_text'] = this.search_text;
    } else {
      query['search_text'] = null;
    }

    this.router.navigate([], {
      queryParams: query,
      queryParamsHandling: 'merge',
    });
  }
}
