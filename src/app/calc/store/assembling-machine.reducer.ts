import { AssemblingMachine } from '../shared/assembling-machine.model';
import {
  AssemblingMachineActions,
  AssemblingMachineActionTypes
} from './assembling-machine.actions';

export interface AssemblingMachineState {
  assemblingMachines: { [name: string]: AssemblingMachine };
  selectedMachineForRecipe: { [recipe: string]: string };
  isLoading: boolean;
  loaded: boolean;
}

export const initialState: AssemblingMachineState = {
  assemblingMachines: {},
  selectedMachineForRecipe: {},
  isLoading: false,
  loaded: false
};

export function reducer(
  state = initialState,
  action: AssemblingMachineActions
): AssemblingMachineState {
  switch (action.type) {
    case AssemblingMachineActionTypes.LOAD_ASSEMBLING_MACHINE_SUCCESS:
      return {
        ...state,
        assemblingMachines: action.payLoad,
        isLoading: false,
        loaded: true
      };
    case AssemblingMachineActionTypes.LOAD_ASSEMBLING_MACHINE_SUCCESS_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: false
      };
    case AssemblingMachineActionTypes.SELECT_ASSEMBLING_MACHINE:
      return {
        ...state,
        selectedMachineForRecipe: {
          ...state.selectedMachineForRecipe,
          ...action.payLoad
        }
      };
    case AssemblingMachineActionTypes.DESELECT__ASSEMBLING_MACHINE:
      return {
        ...state,
        selectedMachineForRecipe: {
          ...filterOnKeys(state.selectedMachineForRecipe, action.payLoad.recipe)
        }
      };
    default:
      return state;
  }
}

function filterOnKeys(
  selectedMachineForRecipe: { [recipe: string]: string },
  recipe: string
): { [recipe: string]: string } {
  const result = {};
  for (const recipeName in selectedMachineForRecipe) {
    if (recipeName !== recipe) {
      result[recipeName] = selectedMachineForRecipe[recipeName];
    }
  }
  return result;
}

export const getAssemblingMachines = (store: AssemblingMachineState) => store.assemblingMachines;
export const getAllAssemblingMachines = (store: AssemblingMachineState) =>
  Object.keys(store.assemblingMachines).map(key => store.assemblingMachines[key]);
export const getSelectedMachineForRecipe = (store: AssemblingMachineState) =>
  store.selectedMachineForRecipe;
export const getLoaded = (store: AssemblingMachineState) => store.loaded;
