import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as appActions from '../../../actions/app.actions';
import * as developerActions from '../actions/developer.actions';
import { switchMap, map } from 'rxjs/operators';
import { DeveloperEntity } from '../reducers/developers.reducers';

@Injectable()
export class DeveloperEffects {

  @Effect() loadDevelopers$ = this.action$
    .pipe(
      ofType(developerActions.LOAD_DEVELOPERS),
      switchMap(() => this.http.get<{ data: DeveloperEntity[] }>(this.Uri)
        .pipe(
          map(r => r.data),
          map(d => new developerActions.LoadedDevelopersSuccessfully(d))
        ))
    );
  // TODO: Add this to the environment
  readonly Uri = 'http://localhost:3000/developers';

  constructor(private action$: Actions, private http: HttpClient) {

  }
}
