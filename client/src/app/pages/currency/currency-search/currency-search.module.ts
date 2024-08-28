import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrencySearchComponent } from './currency-search.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CurrencySearchComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CurrencySearchComponent],
})
export class CurrencySearchModule {}
