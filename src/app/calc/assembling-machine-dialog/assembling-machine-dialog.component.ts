import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AssemblingMachine } from '../shared/assembling-machine.model';
import { AssemblingMachineService } from '../shared/assembling-machine.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { SelectRecipe } from '../store/recipe.actions';

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
    private assemblingMachineService: AssemblingMachineService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.availableMachines$ = this.assemblingMachineService
      .getAvailableAssemblingMachines(this.data.recipeName)
      .pipe(map(machines => machines.sort((that, other) => that.name.localeCompare(other.name))));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectAssemblingMachine(machine: AssemblingMachine): void {
    this.store.dispatch(new SelectRecipe(this.data.recipeName));
    this.assemblingMachineService.selectAssemblingMachine(machine.name, this.data.recipeName);
    this.dialogRef.close();
  }
}
