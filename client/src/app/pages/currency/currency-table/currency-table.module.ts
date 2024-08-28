import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrencyTableComponent } from './currency-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [CurrencyTableComponent],
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  exports: [CurrencyTableComponent],
})

export class CurrencyTableModule {}