import * as fromItems from './deposit-expenditure.actions';
import { DepositExpenditure } from './deposit-expenditure.model';
import { AppState } from '../app.reducer';

export interface ItemsState {
  items: DepositExpenditure[];
}

export interface AppItemsState extends AppState {
  items: ItemsState;
}

const itemsInitState: ItemsState = {
  items: []
};

export function itemsReducer(state: ItemsState = itemsInitState, actions: fromItems.itemsActions): ItemsState {
  switch (actions.type) {
    case fromItems.SET_ITEMS:
      return {
        items: [
          ...actions.items.map(item => {
            return {
              ...item
            };
          })
        ]
      };
    case fromItems.UNSET_ITEMS:
      return {
        items: []
      };

    default:
      return state;
  }
}
