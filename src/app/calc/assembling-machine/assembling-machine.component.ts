import { Component, Input, OnInit } from '@angular/core';
import { AssemblingMachine } from '../shared/assembling-machine.model';

@Component({
  selector: 'app-assembling-machine',
  templateUrl: './assembling-machine.component.html',
  styleUrls: ['./assembling-machine.component.css']
})
export class AssemblingMachineComponent implements OnInit {
  @Input()
  assemblingMachine: AssemblingMachine;

  constructor() {}

  ngOnInit() {}
}
