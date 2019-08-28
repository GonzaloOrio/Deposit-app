import * as fromUI from './ui.actions';

export interface UiState {
  isLoading: boolean;
}

const appInitState: UiState = {
  isLoading: false
};

export function uiReducer(state: UiState = appInitState, actions: fromUI.loadingActions): UiState {
  switch (actions.type) {
    case fromUI.LOADING_ACTIVATE:
      return {
        isLoading: true
      };

    case fromUI.LOADING_DEACTIVATE:
      return {
        isLoading: false
      };

    default:
      return state;
  }
}
