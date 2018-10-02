import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  @Input()
  iconUrl: String;

  fullUrl: String;

  constructor() {}

  ngOnInit() {
    this.fullUrl = `assets/graphics/${this.iconUrl}`;
  }
}
