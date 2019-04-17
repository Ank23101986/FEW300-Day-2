import * as fromDevelopers from './developers.reducers';
import * as fromSorters from './sorters.reducers';
import * as fromUiHints from './ui-hints.reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DevelopersListItem } from '../models';

export const featureName = 'issuesFeature';

export interface State {
  developers: fromDevelopers.State;
  sorters: fromSorters.State;
  uiHints: fromUiHints.State;
}
export const reducers: ActionReducerMap<State> = {
  developers: fromDevelopers.reducer,
  sorters: fromSorters.reducer,
  uiHints: fromUiHints.reducer
};


// 1. Feature Reducer
export const _selectIssuesFeature = createFeatureSelector<State>(featureName);

// 2. Reducers per branch
export const _selectorDevelopersBranch = createSelector(_selectIssuesFeature, b => b.developers); // For displayng developer list branch
export const _selectSortersBranch = createSelector(_selectIssuesFeature, b => b.sorters); // For developer sort branch
export const _selectUiHintsBranch = createSelector(_selectIssuesFeature, b => b.uiHints); // For developer UI hints branch

// 3. Any Helpers you might need
export const { selectAll: _selectDeveloperEntities } = fromDevelopers.adapter.getSelectors(_selectorDevelopersBranch);
export const _selectDeveloperListItemsUnsorted = createSelector(_selectDeveloperEntities, devs => devs as DevelopersListItem[]);
// selectAll selects all developer entities and (return those entities in the form of array) from _selectorDevelopersBranch
// Try this in browser console - console.log(fromDevelopers.adapter.getSelectors(_selectorDevelopersBranch));

// 4. The reducers you select from in your component/etc
export const selectSortDeveloperListBy = createSelector(_selectSortersBranch, b => b.sortDeveloperBy); // For developer sort branch
export const selectDevelopersLoaded = createSelector(_selectUiHintsBranch, b => b.developersLoaded); // For developer UI hints branch

// TODO: DeveloperListItem[]
export const selectDeveloperListItems = createSelector(_selectDeveloperEntities, devs => devs as DevelopersListItem[]); // For developer list branch

// For Sorter branch
export const selectDeveloperListItem = createSelector(
  _selectDeveloperListItemsUnsorted, selectSortDeveloperListBy, (list, sortkey) => {
    return list.sort((lhs: DevelopersListItem, rhs: DevelopersListItem) => {
      if (lhs[sortkey] < rhs[sortkey]) {
        return -1;
      }
      if (lhs[sortkey] > rhs[sortkey]) {
        return 1;
      }
      return 0;
    }

    );
  }
);

