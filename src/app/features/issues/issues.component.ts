import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
  encapsulation: ViewEncapsulation.None,  // Bleed or provide css down to all its child components
})
export class IssuesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
