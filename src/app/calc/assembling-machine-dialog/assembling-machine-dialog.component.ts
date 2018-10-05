import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AssemblingMachine } from '../shared/assembling-machine.model';
import { AssemblingMachineService } from '../shared/assembling-machine.service';

@Component({
  selector: 'app-assembling-machine-dialog',
  templateUrl: './assembling-machine-dialog.component.html',
  styleUrls: ['./assembling-machine-dialog.component.css']
})
export class AssemblingMachineDialogComponent implements OnInit {
  availableMachines$: Observable<AssemblingMachine[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AssemblingMachineDialogComponent>,
    private assemblingMachineService: AssemblingMachineService
  ) {}

  ngOnInit() {
    this.availableMachines$ = this.assemblingMachineService.getAvailableAssemblingMachines(
      this.data.recipeName
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectAssemblingMachine(machine: AssemblingMachine): void {
    this.assemblingMachineService.selectAssemblingMachine(machine.name, this.data.recipeName);
  }
}
