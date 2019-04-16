import { Component, OnInit } from '@angular/core';
import { DevelopersListItem } from '../../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State, selectDeveloperListItems } from '../../reducers';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit {

  devs$: Observable<DevelopersListItem[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.devs$ = this.store.select(selectDeveloperListItems);
  }

}
