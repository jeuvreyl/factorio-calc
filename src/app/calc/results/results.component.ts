import { Component, OnInit, Input } from '@angular/core';
import { QuantifiedItem } from '../shared/item.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input()
  results: QuantifiedItem[];

  constructor() { }

  ngOnInit() {
  }

}
