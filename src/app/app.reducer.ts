import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromItems from './deposit-expenditure/deposit-expenditure.reducer';

export interface AppState {
  ui: fromUI.UiState;
  auth: fromAuth.AuthState;
  items: fromItems.ItemsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  items: fromItems.itemsReducer
};
