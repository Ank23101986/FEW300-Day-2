import { Actions, Effect, ofType } from '@ngrx/effects';
import * as appActions from '../../../actions/app.actions';
import { concatMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as developerActions from '../actions/developer.actions';

@Injectable()
export class AppStartUpEffects {

  @Effect() addingADeveloperDoneBlewedUp$ = this.actions$
    .pipe(
      ofType(developerActions.ADDED_DEVELOPER_FAILURE),
      map(a => a as developerActions.FailedAddingDeveloper),
      map(a => new appActions.ApplicationError(a.errorMessage, 'issues'))
    );

  @Effect() startup$ = this.actions$
    .pipe(ofType(appActions.APP_START),
      concatMap(() => [
        new developerActions.LoadDevelopers()
      ])
    );
  constructor(private actions$: Actions) {

  }
}
