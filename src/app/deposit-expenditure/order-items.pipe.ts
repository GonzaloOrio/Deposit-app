import { Pipe, PipeTransform } from '@angular/core';
import { DepositExpenditure } from './deposit-expenditure.model';

@Pipe({
  name: 'orderItems'
})
export class OrderItemsPipe implements PipeTransform {
  transform(items: DepositExpenditure[]): DepositExpenditure[] {
    return items.sort((a, b) => {
      if (a.type === 'deposit') {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
