import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as appActions from '../../../actions/app.actions';
import * as developerActions from '../actions/developer.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { DeveloperEntity } from '../reducers/developers.reducers';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class DeveloperEffects {
  // TODO: Add this to the environment
  readonly Uri = 'http://localhost:3000/developers';

  @Effect() addDeveloper$ = this.action$
    .pipe(
      ofType(developerActions.ADDED_DEVELOPER),
      map(a => a as developerActions.AddedDeveloper),
      switchMap(originalAction => this.http.post<DeveloperEntity>(this.Uri, originalAction)
        .pipe(
          map(developerFromServer => new developerActions.SuccessfullyAddedDeveloper(originalAction.payload.id, developerFromServer)),
          catchError(r =>
            of(new developerActions.FailedAddingDeveloper('Cannot Add that Developer', originalAction.payload))
          )
        ))
    );

  @Effect() loadDevelopers$ = this.action$
    .pipe(
      ofType(developerActions.LOAD_DEVELOPERS),
      switchMap(() => this.http.get<{ data: DeveloperEntity[] }>(this.Uri)
        .pipe(
          map(r => r.data),
          map(d => new developerActions.LoadedDevelopersSuccessfully(d))
        ))
    );

  constructor(private action$: Actions, private http: HttpClient) {

  }
}
