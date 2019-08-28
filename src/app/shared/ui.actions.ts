import { Action } from '@ngrx/store';

export const LOADING_ACTIVATE = '[UI Loading] Loading...';
export const LOADING_DEACTIVATE = '[UI Loading] Finish Loading...';

export class ActivateLoadingAction implements Action {
  readonly type = LOADING_ACTIVATE;
}

export class DeactivateLoadingAction implements Action {
  readonly type = LOADING_DEACTIVATE;
}

export type loadingActions = ActivateLoadingAction | DeactivateLoadingAction;
