import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, combineLatest, filter, flatMap, map, startWith, tap } from 'rxjs/operators';
import {
  getAllAssemblingMachines,
  getAssemblingMachines,
  getAssemblingMachinesLoaded,
  getRecipes,
  State
} from '../../reducers';
import {
  LoadAssemblingMachineFail,
  LoadAssemblingMachineSuccess,
  SelectAssemblingMachine
} from '../store/assembling-machine.actions';
import { AssemblingMachine } from './assembling-machine.model';

@Injectable({
  providedIn: 'root'
})
export class AssemblingMachineService {
  private reloadData$;

  constructor(private http: HttpClient, private store: Store<State>) {
    this.reloadData$ = this.store.select(getAssemblingMachinesLoaded).pipe(
      filter(isLoaded => !isLoaded),
      flatMap(() => this.getAssemblingMachinesFromhttp()),
      tap(machines => this.store.dispatch(new LoadAssemblingMachineSuccess(machines))),
      catchError(() => {
        this.store.dispatch(new LoadAssemblingMachineFail());
        return of({});
      })
    );
  }

  getAssemblingMachines(): Observable<{ [name: string]: AssemblingMachine }> {
    return this.reloadData$.pipe(
      startWith(null),
      combineLatest(this.store.select(getAssemblingMachines)),
      map(([_, machines]) => machines)
    );
  }

  getAvailableAssemblingMachines(recipeName: string): Observable<AssemblingMachine[]> {
    return this.reloadData$.pipe(
      startWith(null),
      combineLatest(this.store.select(getAllAssemblingMachines)),
      map(([_, machines]) => machines),
      combineLatest(this.store.select(getRecipes)),
      map(([machines, recipes]) => {
        const recipe = recipes[recipeName];
        return machines.filter(machine =>
          machine.craftingCategories.includes(recipe.craftingCategory)
        );
      })
    );
  }

  selectAssemblingMachine(machineName: string, recipeName: string): void {
    this.store.dispatch(new SelectAssemblingMachine({ machine: machineName, recipe: recipeName }));
  }

  private getAssemblingMachinesFromhttp(): Observable<{ [name: string]: AssemblingMachine }> {
    return this.http.get<{ [name: string]: AssemblingMachine }>(
      './assets/dataset/assembling-machines.json'
    );
  }
}
