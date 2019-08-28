import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { DepositExpenditure } from '../deposit-expenditure.model';
import { filter } from 'rxjs/operators';
import { DepositExpenditureService } from '../deposit-expenditure.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {
  itemsSubscription: Subscription = new Subscription();
  items: DepositExpenditure[] = [];

  constructor(private store: Store<AppState>, public depExpService: DepositExpenditureService) {}

  ngOnInit() {
    this.itemsSubscription = this.store
      .select('items')
      // .pipe(
      //   filter((data: any) => {
      //     return data.items.length >= 1;
      //   })
      // )
      .subscribe(data => {
        console.log('entra subscribe::', data);

        this.items = data.items;
      });
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

  deleteItem(uid: string) {
    this.depExpService
      .deleteItem(uid)
      .then(() => {
        Swal.fire({
          title: `Eliminado`,
          text: `Se ha eliminado correctamente`,
          type: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch(err => {
        Swal.fire({
          title: `Error`,
          text: `Error al eliminar`,
          type: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
}
