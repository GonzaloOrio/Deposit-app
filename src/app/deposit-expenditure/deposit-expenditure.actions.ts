import { Action } from '@ngrx/store';
import { DepositExpenditure } from './deposit-expenditure.model';
export const SET_ITEMS = '[Deposit-Expenditure] set Deposit-Expenditure';
export const UNSET_ITEMS = '[Deposit-Expenditure] unset Deposit-Expenditure';

export class SetItemsAction implements Action {
  readonly type = SET_ITEMS;

  constructor(public items: DepositExpenditure[]) {}
}

export class UnsetItemsAction implements Action {
  readonly type = UNSET_ITEMS;
}

export type itemsActions = SetItemsAction | UnsetItemsAction;
