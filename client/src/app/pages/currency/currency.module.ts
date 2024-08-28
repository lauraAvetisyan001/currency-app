import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrencyComponent } from './currency.component';
import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyTableModule } from './currency-table/currency-table.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CurrencySearchModule } from './currency-search/currency-search.module';

@NgModule({
  declarations: [CurrencyComponent],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    CurrencyTableModule,
    CurrencySearchModule,
    InfiniteScrollModule,
  ],
  exports: [CurrencyComponent],
})
export class CurrencyModule {}
