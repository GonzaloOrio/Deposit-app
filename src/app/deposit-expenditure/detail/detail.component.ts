import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DepositExpenditure } from '../deposit-expenditure.model';
import { DepositExpenditureService } from '../deposit-expenditure.service';
import { AppItemsState } from '../deposit-expenditure.reducer';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {
  itemsSubscription: Subscription = new Subscription();
  items: DepositExpenditure[] = [];

  constructor(private store: Store<AppItemsState>, public depExpService: DepositExpenditureService) {}

  ngOnInit() {
    this.itemsSubscription = this.store.select('items').subscribe(data => {
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
