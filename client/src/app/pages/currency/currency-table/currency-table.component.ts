import { Component, Input } from '@angular/core';
import { Currency } from '../../../shared/interfaces/currency';
import { CURRENCY_COLUMNS } from '../../../shared/constants/currencyTableColumns';

@Component({
  selector: 'app-currency-table',
  templateUrl: './currency-table.component.html',
  styleUrl: './currency-table.component.scss',
})
export class CurrencyTableComponent {
  public displayedColumns: string[] = CURRENCY_COLUMNS;

  @Input() public currencies!: Currency[];
}
