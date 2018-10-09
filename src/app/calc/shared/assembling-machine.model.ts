interface AssemblingMachineObject {
  name: string;
  iconUrl: string;
  craftingSpeed: number;
  ingredientCount: number;
  craftingCategories: Array<string>;
  recipe: string;
}

export type AssemblingMachine = Readonly<AssemblingMachineObject>;
