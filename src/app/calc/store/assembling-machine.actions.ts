import { Action } from '@ngrx/store';
import { AssemblingMachine } from '../shared/assembling-machine.model';

export enum AssemblingMachineActionTypes {
  LOAD_ASSEMBLING_MACHINE_SUCCESS = '[Assembling-Machine] Load Assembling Machine Success',
  LOAD_ASSEMBLING_MACHINE_SUCCESS_FAIL = '[Assembling-Machine]Load Assembling Machine Fail',
  SELECT_ASSEMBLING_MACHINE = '[Assembling-Machine] Select Assembling Machine',
  DESELECT__ASSEMBLING_MACHINE = '[Assembling-Machine] Deselect Assembling Machine'
}

export class LoadAssemblingMachineSuccess implements Action {
  readonly type = AssemblingMachineActionTypes.LOAD_ASSEMBLING_MACHINE_SUCCESS;
  constructor(public payLoad: { [name: string]: AssemblingMachine }) {}
}

export class LoadAssemblingMachineFail implements Action {
  readonly type = AssemblingMachineActionTypes.LOAD_ASSEMBLING_MACHINE_SUCCESS_FAIL;
}

export class SelectAssemblingMachine implements Action {
  readonly type = AssemblingMachineActionTypes.SELECT_ASSEMBLING_MACHINE;

  constructor(public payLoad: { machine: string; recipe: string }) {}
}

export class DeselecAssemblingMachine implements Action {
  readonly type = AssemblingMachineActionTypes.DESELECT__ASSEMBLING_MACHINE;

  constructor(public payLoad: { recipe: string }) {}
}

export type AssemblingMachineActions =
  | LoadAssemblingMachineSuccess
  | LoadAssemblingMachineFail
  | SelectAssemblingMachine
  | DeselecAssemblingMachine;
