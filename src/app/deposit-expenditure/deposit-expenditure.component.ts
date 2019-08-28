import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepositExpenditure } from './deposit-expenditure.model';
import { DepositExpenditureService } from './deposit-expenditure.service';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-deposit-expenditure',
  templateUrl: './deposit-expenditure.component.html',
  styles: []
})
export class DepositExpenditureComponent implements OnInit, OnDestroy {
  depositForm: FormGroup;
  type: string = 'deposit';
  loading: boolean;
  subscription: Subscription = new Subscription();

  constructor(public depExpService: DepositExpenditureService, private store: Store<AppState>) {}

  ngOnInit() {
    this.depositForm = new FormGroup({
      description: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.min(0))
    });

    this.subscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeType(newType) {
    this.type = newType;
    console.log('this.type es::::', this.type);
  }

  addDepositExpenditure() {
    this.store.dispatch(new ActivateLoadingAction());
    const depExpData = new DepositExpenditure({ ...this.depositForm.value, type: this.type });
    this.depExpService
      .addDepositExpenditure(depExpData)
      .then(res => {
        this.depositForm.reset({ amount: 0 });
        Swal.fire({
          title: `Añadido`,
          text: `Se ha añadido correctamente`,
          type: 'success',
          confirmButtonText: 'OK'
        });
        this.store.dispatch(new DeactivateLoadingAction());
      })
      .catch(err => {
        Swal.fire({
          title: `Error`,
          text: `Error al añadir`,
          type: 'error',
          confirmButtonText: 'OK'
        });
        this.store.dispatch(new DeactivateLoadingAction());
      });
  }
}
