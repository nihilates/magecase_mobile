import * as RouteActions from './routeActions';
import * as AccountActions from './accountActions.js';
import * as SelectionActions from './selectionActions';

export const ActionCreators = Object.assign({},
  RouteActions,
  AccountActions,
  SelectionActions,
);